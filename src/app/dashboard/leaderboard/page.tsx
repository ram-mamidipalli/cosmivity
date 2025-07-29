"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>This is the page for the Leaderboard. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
