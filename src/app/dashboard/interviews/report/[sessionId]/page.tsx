
"use client";

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function InterviewReportPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.sessionId as string;

    return (
        <div className="flex flex-col items-center justify-center min-h-full p-4">
            <Card className="w-full max-w-2xl text-center">
                <CardHeader className="items-center">
                    <div className="p-3 bg-green-100 rounded-full mb-2">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">Interview Complete!</CardTitle>
                    <CardDescription>
                        Session ID: {sessionId}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Your performance report is being generated. In a real application, you would see detailed analytics on your communication, confidence, and technical skills here.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => router.push('/dashboard/interviews')}>Back to Interviews</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
