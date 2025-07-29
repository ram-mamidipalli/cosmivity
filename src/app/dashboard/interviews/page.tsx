"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InterviewsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Mock Interviews (AI)</h1>
            <p className="text-muted-foreground">Practice with our AI interviewer.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Mock Interviews</CardTitle>
                <CardDescription>This is the page for AI-powered Mock Interviews. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
