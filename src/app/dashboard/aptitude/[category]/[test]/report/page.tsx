
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CircularProgress } from '@/components/ui/circular-progress';

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type Answers = { [key: number]: string };

export default function TestReportPage() {
    const params = useParams();
    const router = useRouter();
    const testName = (Array.isArray(params.test) ? params.test[0] : params.test).replace(/-/g, " ");

    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<Answers>({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Retrieve data from sessionStorage on the client side
        const storedQuestions = sessionStorage.getItem('testQuestions');
        const storedAnswers = sessionStorage.getItem('userAnswers');

        if (storedQuestions && storedAnswers) {
            const parsedQuestions: Question[] = JSON.parse(storedQuestions);
            const parsedAnswers: Answers = JSON.parse(storedAnswers);
            
            setQuestions(parsedQuestions);
            setUserAnswers(parsedAnswers);

            // Calculate score
            let correctAnswers = 0;
            parsedQuestions.forEach(q => {
                if (parsedAnswers[q.id] === q.answer) {
                    correctAnswers++;
                }
            });
            setScore(correctAnswers);
        } else {
            // Handle case where data is not found, maybe redirect
            router.push(`/dashboard/aptitude/${params.category}`);
        }
    }, [params.category, router]);

    const scorePercentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline capitalize">Report: {testName}</h1>
                <p className="text-muted-foreground">Here is a summary of your performance.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Your Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="relative">
                        <CircularProgress value={scorePercentage} size={200} strokeWidth={15} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-primary">{Math.round(scorePercentage)}%</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold">{score} / {questions.length}</p>
                        <p className="text-muted-foreground">Correct Answers</p>
                         <Button onClick={() => router.back()} className="mt-4">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                    <CardDescription>Review your answers and learn from the explanations.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-6">
                        {questions.map((question) => {
                            const userAnswer = userAnswers[question.id];
                            const isCorrect = userAnswer === question.answer;

                            return (
                                <li key={question.id} className="p-4 border rounded-md">
                                    <h3 className="font-semibold text-lg">{question.id}. {question.question}</h3>
                                    <div className="mt-4 space-y-2">
                                        {question.options.map(option => {
                                            const isSelected = userAnswer === option;
                                            const isCorrectAnswer = question.answer === option;

                                            return (
                                                <div key={option} className={cn("p-2 rounded-md flex items-center gap-2", 
                                                    isCorrectAnswer ? "bg-green-100 dark:bg-green-900/30" : "",
                                                    isSelected && !isCorrectAnswer ? "bg-red-100 dark:bg-red-900/30" : ""
                                                )}>
                                                    {isCorrectAnswer ? <CheckCircle className="h-5 w-5 text-green-500" /> : (isSelected ? <XCircle className="h-5 w-5 text-red-500" /> : <div className="h-5 w-5"/>)}
                                                    <span>{option}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="p-3 bg-primary/5 rounded-lg">
                                        <p><span className="font-bold">Your Answer:</span> {userAnswer || <span className="italic text-muted-foreground">Not Answered</span>}</p>
                                        <p><span className="font-bold">Correct Answer:</span> {question.answer}</p>
                                        <p className="mt-2 text-muted-foreground"><span className="font-bold text-foreground">Explanation:</span> {question.explanation}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
