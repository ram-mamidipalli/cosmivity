"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ChallengesPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Team Challenges</h1>
            <p className="text-muted-foreground">Collaborate and conquer.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Team Challenges</CardTitle>
                <CardDescription>This is the page for Team Challenges. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
