
"use client";

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TestReportPage() {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();

    const testName = (Array.isArray(params.test) ? params.test[0] : params.test).replace(/-/g, " ");

    const answers: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        answers[key] = value;
    });

    return (
        <div className="flex flex-col gap-8">
             <header>
                <h1 className="text-3xl font-bold font-headline capitalize">Test Report: {testName}</h1>
                <p className="text-muted-foreground">Here is a summary of your test performance.</p>
            </header>
            <Card className="glassmorphic">
                <CardHeader>
                    <CardTitle>Your Answers</CardTitle>
                    <CardDescription>Review the answers you submitted.</CardDescription>
                </CardHeader>
                <CardContent>
                   {Object.keys(answers).length > 0 ? (
                     <ul className="space-y-2">
                        {Object.entries(answers).map(([questionId, answer]) => (
                            <li key={questionId} className="p-2 border rounded-md">
                                <span className="font-semibold">Question {questionId}:</span> You selected <span className="font-mono p-1 bg-muted rounded-sm">{answer}</span>
                            </li>
                        ))}
                    </ul>
                   ): (
                    <p>You did not answer any questions.</p>
                   )}
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.back()}>Back to Test</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
