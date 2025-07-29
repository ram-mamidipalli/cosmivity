"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AptitudePage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Aptitude Practice</h1>
            <p className="text-muted-foreground">Sharpen your skills.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Aptitude Practice</CardTitle>
                <CardDescription>This is the page for Aptitude Practice. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
