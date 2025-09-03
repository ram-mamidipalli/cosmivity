
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CompilerPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Online Compiler</h1>
            <p className="text-muted-foreground">Compile and run your code.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Online Compiler</CardTitle>
                <CardDescription>This is the page for the Online Compiler. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
