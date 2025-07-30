
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Teams</h1>
            <p className="text-muted-foreground">Join communities and forums.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Community Forums</CardTitle>
                <CardDescription>This is the page for Teams. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}

    