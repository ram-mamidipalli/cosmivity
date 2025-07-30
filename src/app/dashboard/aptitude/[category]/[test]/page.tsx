
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionView from "@/components/dashboard/aptitude/QuestionView";
import { cn } from "@/lib/utils";

const questionsData: { [key: string]: any[] } = {
  "arithmetic-aptitude": [
    {
      id: 1,
      question: "The average of first 50 natural numbers is .............",
      options: ["25.30", "25.5", "25.00", "25.20"],
      answer: "25.5",
      explanation: "The average of first n natural numbers is (n+1)/2. So, the average of first 50 natural numbers is (50+1)/2 = 25.5.",
      comments: [
        { user: "Priya", text: "This was a tricky one, but the explanation helped!" },
        { user: "Rahul", text: "I always forget this formula. Thanks for the reminder." },
      ],
    },
    {
      id: 2,
      question: "A number when divided by 296 gives a remainder 75. When the same number is divided by 37, the remainder will be:",
      options: ["1", "2", "8", "11"],
      answer: "1",
      explanation: "Let the number be x. Then, x = 296q + 75. Since 296 is a multiple of 37, we can write 296 = 37 * 8. So, x = (37 * 8)q + 75. When x is divided by 37, the remainder is the same as when 75 is divided by 37, which is 1.",
      comments: [],
    },
  ],
  // Add more questions for other tests
};

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const test = Array.isArray(params.test) ? params.test[0] : params.test;

  const testName = test.replace(/-/g, " ");
  const questions = questionsData[test] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<number[]>([0]);

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
            {questions.length > 0 ? (
                 <QuestionView 
                    question={questions[currentQuestionIndex]}
                    selectedOption={answers[questions[currentQuestionIndex].id]}
                    onAnswerChange={(option) => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                 />
            ) : (
                <Card className="glassmorphic">
                    <CardHeader>
                        <CardTitle>No Questions Yet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Questions for this test will be added soon. Check back later!</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-between mt-8">
                <Button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
                        Submit Test
                    </Button>
                ) : (
                    <Button onClick={handleNext} disabled={currentQuestionIndex >= questions.length - 1}>
                        Next
                    </Button>
                )}
            </div>
        </div>
        <div className="lg:col-span-1">
            <Card className="glassmorphic">
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
                                        !isCurrent && !isAnswered && isVisited && 'bg-muted'
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
