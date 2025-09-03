
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InternshipsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Internships</h1>
            <p className="text-muted-foreground">Find and apply for internships.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Internships</CardTitle>
                <CardDescription>This is the page for Internships. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
