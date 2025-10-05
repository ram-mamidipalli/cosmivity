
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Video, Lock } from "lucide-react";

export default function EventCard({ event }: { event: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col relative">
            {event.isUpcoming && <Badge className="absolute top-4 right-4">Upcoming</Badge>}
            <CardHeader>
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
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                 <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                 {event.isUpcoming ? (
                    <Button className="w-full" variant="secondary" disabled>
                        <Lock className="mr-2 h-4 w-4" /> Coming Soon
                    </Button>
                 ) : (
                    <Button className="w-full">Register</Button>
                 )}
            </CardFooter>
        </Card>
    )
}
