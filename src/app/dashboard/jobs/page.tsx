
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Jobs</h1>
            <p className="text-muted-foreground">Find your next opportunity.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Job Listings</CardTitle>
                <CardDescription>This is the page for Job Listings. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
