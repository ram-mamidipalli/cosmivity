
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Events</h1>
            <p className="text-muted-foreground">Stay updated with the latest events.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>This is the page for Events. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
