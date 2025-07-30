
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionView from "@/components/dashboard/aptitude/QuestionView";
import { cn } from "@/lib/utils";
import { generateTestQuestions } from "@/ai/flows/generate-test-questions";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const test = Array.isArray(params.test) ? params.test[0] : params.test;
  const searchParams = new URLSearchParams(window.location.search);
  const numberOfQuestions = parseInt(searchParams.get('questions') || '10', 10);


  const testName = test.replace(/-/g, " ");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<number[]>([0]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await generateTestQuestions({ topic: testName, numberOfQuestions });
        setQuestions(response.questions);
      } catch (error) {
        console.error("Failed to generate test questions:", error);
        // Optionally, set some error state to show in the UI
      } finally {
        setLoading(false);
      }
    };

    if(testName) {
        fetchQuestions();
    }
  }, [testName, numberOfQuestions]);


  const handleSetCurrentQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (!visited.includes(index)) {
      setVisited([...visited, index]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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
    // Navigate to report page, passing answers in query params for now
    const query = new URLSearchParams(answers as any).toString();
    router.push(`/dashboard/aptitude/${category}/${test}/report?${query}`);
  }

  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <Link href={`/dashboard/aptitude/${category}`} className="text-sm text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to {category.charAt(0).toUpperCase() + category.slice(1)} Tests
        </Link>
        <h1 className="text-3xl font-bold font-headline mt-2 capitalize">{testName}</h1>
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
            ) : questions.length > 0 ? (
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
                        <p>Questions for this test will be added soon. Check back later!</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-between mt-8">
                <Button onClick={handlePrev} disabled={currentQuestionIndex === 0 || loading}>
                Previous
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white" disabled={loading}>
                        Submit Test
                    </Button>
                ) : (
                    <Button onClick={handleNext} disabled={currentQuestionIndex >= questions.length - 1 || loading}>
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
                        {questions.map((q, index) => {
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
