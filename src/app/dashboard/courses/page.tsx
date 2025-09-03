
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Courses</h1>
            <p className="text-muted-foreground">Explore and enroll in courses.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Courses</CardTitle>
                <CardDescription>This is the page for Courses. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
