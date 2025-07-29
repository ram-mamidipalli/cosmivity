"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PassportPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Skill Passport</h1>
            <p className="text-muted-foreground">Your verified skills profile.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Skill Passport</CardTitle>
                <CardDescription>This is the page for your Skill Passport. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
