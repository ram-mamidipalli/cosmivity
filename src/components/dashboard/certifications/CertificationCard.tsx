
"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, BarChart, Bookmark, FileText } from "lucide-react";

export default function CertificationCard({ certification }: { certification: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col group overflow-hidden">
            <CardHeader className="p-4 flex-row items-center justify-between space-y-0">
                <div className="p-3 bg-primary/10 rounded-full">
                    <FileText className="h-6 w-6 text-primary"/>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/70 hover:bg-background">
                    <Bookmark className="h-4 w-4"/>
                </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                 <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="secondary">{certification.domain}</Badge>
                </div>
                <h3 className="font-bold font-headline text-base leading-tight h-10 overflow-hidden">{certification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5"><Building className="h-4 w-4"/>{certification.provider}</p>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5"><BarChart className="h-4 w-4"/> {certification.level}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                 <div className="flex flex-wrap gap-1">
                    {certification.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                </div>
                 <Button asChild size="sm">
                    <Link href={certification.link || '#'} target="_blank" rel="noopener noreferrer">Details</Link>
                 </Button>
            </CardFooter>
        </Card>
    )
}
