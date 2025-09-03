
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Video } from "lucide-react";

export default function EventCard({ event }: { event: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader className="p-0">
                <Image src={event.image} alt={event.title} width={600} height={400} className="rounded-t-lg object-cover aspect-video" data-ai-hint={event.hint} />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant={event.type === 'Bootcamp' ? "destructive" : "secondary"}>{event.type}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {event.format === 'Online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                        <span>{event.format === 'Online' ? 'Online' : event.location}</span>
                    </div>
                </div>
                <CardTitle className="text-lg font-headline">{event.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{event.speaker}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                 <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                <Button>Register</Button>
            </CardFooter>
        </Card>
    )
}
