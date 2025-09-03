
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, BarChart, Bookmark } from "lucide-react";

export default function CertificationCard({ certification }: { certification: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col group overflow-hidden">
            <CardHeader className="p-0 relative">
                <Link href={`/dashboard/certifications/${certification.id}`}>
                    <Image 
                        src={certification.image} 
                        alt={certification.title} 
                        width={600} 
                        height={400} 
                        className="rounded-t-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105" 
                        data-ai-hint={certification.hint} 
                    />
                </Link>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 hover:bg-background">
                    <Bookmark className="h-4 w-4"/>
                </Button>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                 <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="secondary">{certification.domain}</Badge>
                </div>
                <h3 className="font-bold font-headline text-lg leading-tight h-12 overflow-hidden">{certification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5"><Building className="h-4 w-4"/>{certification.provider}</p>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5"><BarChart className="h-4 w-4"/> {certification.level}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                 <div className="flex flex-wrap gap-1">
                    {certification.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                 <Button asChild>
                    <Link href={`/dashboard/certifications/${certification.id}`}>View Details</Link>
                 </Button>
            </CardFooter>
        </Card>
    )
}
