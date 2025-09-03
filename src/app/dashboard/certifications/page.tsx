
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CertificationsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Certifications</h1>
            <p className="text-muted-foreground">Browse and manage your certifications.</p>
            </div>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>This is the page for Certifications. Content coming soon!</CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
