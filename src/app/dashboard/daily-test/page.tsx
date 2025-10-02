
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Code2, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionView from "@/components/dashboard/aptitude/QuestionView";
import { cn } from "@/lib/utils";
import { generateTestQuestions } from "@/ai/flows/generate-test-questions";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const initialCode = `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`;

export default function DailyTestPage() {
  const router = useRouter();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [codingQuestion, setCodingQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<number[]>([0]);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoadingCode, setIsLoadingCode] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // This is a placeholder. In a real app, you would create a new flow 
        // to generate a mix of questions including a coding one.
        const response = await generateTestQuestions({ topic: "General Aptitude Mix", numberOfQuestions: 9 });
        setQuestions(response.questions);
        setCodingQuestion({
            id: 10,
            question: "Write a program to check if a number is a palindrome.",
            description: "A palindrome is a number that reads the same backward as forward. For example, 121 is a palindrome, but 123 is not."
        });
      } catch (error) {
        console.error("Failed to generate test questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const totalQuestions = questions.length + (codingQuestion ? 1 : 0);

  const handleSetCurrentQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (!visited.includes(index)) {
      setVisited([...visited, index]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      handleSetCurrentQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      handleSetCurrentQuestion(currentQuestionIndex - 1);
    }
  };
  
  const handleAnswerChange = (questionId: number, option: string) => {
    setAnswers(prev => ({...prev, [questionId]: option}));
  }

  const handleSubmit = () => {
    // Navigate to report page
    router.push(`/dashboard`);
  }

  const handleRunCode = () => {
        setIsLoadingCode(true);
        setOutput("Running your code...");
        setTimeout(() => {
            setOutput("Test Case 1: Passed\nTest Case 2: Passed\nTest Case 3: Failed");
            setIsLoadingCode(false);
        }, 1500);
    }

  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;
  const isCodingQuestion = codingQuestion && currentQuestionIndex === questions.length;

  return (
    <div className="flex flex-col gap-8 p-8">
      <header>
        <Link href={`/dashboard`} className="text-sm text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold font-headline mt-2 capitalize">Daily Quick Practice</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {loading ? (
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-5 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                 </Card>
            ) : isCodingQuestion ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-code">Question {codingQuestion.id}</CardTitle>
                        <CardDescription className="text-lg text-foreground">{codingQuestion.question}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p>{codingQuestion.description}</p>
                         <Textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            className="h-64 w-full rounded-lg resize-none font-code text-base"
                        />
                        <div className="flex items-center justify-between">
                            <Button onClick={handleRunCode} disabled={isLoadingCode}>
                                <Play className="mr-2"/>{isLoadingCode ? 'Running...' : 'Run Code'}
                            </Button>
                        </div>
                        <Card className="h-32">
                            <CardContent className="p-4">
                                <pre className="text-sm text-wrap">{output || 'Output will be displayed here.'}</pre>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
                 <QuestionView 
                    question={questions[currentQuestionIndex]}
                    selectedOption={answers[questions[currentQuestionIndex].id]}
                    onAnswerChange={(option) => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                 />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>No Questions Yet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Questions for this practice will be added soon. Check back later!</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-between mt-8">
                <Button onClick={handlePrev} disabled={currentQuestionIndex === 0 || loading}>
                Previous
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white" disabled={loading}>
                        Submit
                    </Button>
                ) : (
                    <Button onClick={handleNext} disabled={currentQuestionIndex >= totalQuestions - 1 || loading}>
                        Next
                    </Button>
                )}
            </div>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                        {[...questions, codingQuestion].filter(Boolean).map((q, index) => {
                            const isCurrent = index === currentQuestionIndex;
                            const isAnswered = answers[q.id];
                            const isVisited = visited.includes(index);

                            return (
                                <Button 
                                    key={q.id}
                                    variant={'outline'}
                                    className={cn("w-full h-10", 
                                        isCurrent && 'bg-primary/80 text-primary-foreground',
                                        isAnswered && 'bg-green-500 text-white hover:bg-green-600',
                                        !isAnswered && isVisited && 'bg-muted'
                                    )}
                                    onClick={() => handleSetCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
