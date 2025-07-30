"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CoachPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Resume Builder</h1>
            <p className="text-muted-foreground">Get expert feedback.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>This is the page for the Resume Builder. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
