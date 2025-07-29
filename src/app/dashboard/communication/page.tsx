"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CommunicationPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Communication Lab</h1>
            <p className="text-muted-foreground">Improve your verbal skills.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Communication Lab</CardTitle>
                <CardDescription>This is the page for the Communication Lab. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
