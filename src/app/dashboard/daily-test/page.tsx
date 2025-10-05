
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionView from "@/components/dashboard/aptitude/QuestionView";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { quantitativeQuestions } from "@/lib/quantitative-questions";
import { logicalQuestions } from "@/lib/logical-questions";
import { verbalQuestions } from "@/lib/verbal-questions";

const allQuestions = [
    ...Object.values(quantitativeQuestions).flat(),
    ...Object.values(logicalQuestions).flat(),
    ...Object.values(verbalQuestions).flat()
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function DailyTestPage() {
  const router = useRouter();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<number[]>([0]);

  useEffect(() => {
    const fetchQuestions = () => {
        setLoading(true);
        const shuffled = shuffleArray([...allQuestions]);
        setQuestions(shuffled.slice(0, 5));
        setLoading(false);
    };

    fetchQuestions();
  }, []);

  const totalQuestions = questions.length;

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
    const correctAnswers = questions.reduce((acc, q) => {
        if (answers[q.id] === q.answer) {
            return acc + 1;
        }
        return acc;
    }, 0);
    
    // In a real app, you would save this score to the backend.
    // For now, let's just navigate to the dashboard.
    console.log(`Score: ${correctAnswers}/${questions.length}`);
    router.push(`/dashboard`);
  }

  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

  return (
    <div className="flex flex-col gap-8 p-8">
      <header>
        <Link href={`/dashboard`} className="text-sm text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold font-headline mt-2 capitalize">Daily Quick Test</h1>
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
                        <p>Questions for this practice will be added soon. Check back later!</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-between mt-8">
                <Button onClick={handlePrev} disabled={currentQuestionIndex === 0 || loading}>
                Previous
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white" disabled={loading || questions.length === 0}>
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
