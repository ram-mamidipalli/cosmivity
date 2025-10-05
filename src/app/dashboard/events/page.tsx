
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, PlusCircle, Filter, Calendar, Users, Video, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/dashboard/events/EventCard";
import Link from "next/link";

const events = [
    {
        title: "Advanced React Patterns Workshop",
        date: "2024-08-15",
        format: "Online",
        type: "Workshop",
        speaker: "Siddharth Kshetrapal",
        tags: ["React", "Frontend", "Advanced"],
    },
    {
        title: "Data Science Bootcamp",
        date: "2024-09-01",
        format: "Offline",
        location: "Bangalore, India",
        type: "Bootcamp",
        speaker: "AI Society of India",
        tags: ["Data Science", "Python", "Machine Learning"],
    },
];

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Events & Workshops</h1>
                <p className="text-muted-foreground">Discover opportunities to learn, grow, and connect.</p>
            </div>
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href="https://chat.whatsapp.com/J1tm3r08tAWELY0O6kEB0U?mode=ems_copy_t" target="_blank">
                        <MessageCircle className="mr-2"/> Join WhatsApp Community
                    </Link>
                </Button>
            </div>
        </header>

        <Card>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border-b">
                <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search events..." className="pl-10 pr-4 py-2 w-full" />
                </div>
                 <Select>
                    <SelectTrigger>
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-muted-foreground" />
                            <SelectValue placeholder="Event Type" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="bootcamp">Bootcamp</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                         <div className="flex items-center gap-2">
                            <Video className="h-5 w-5 text-muted-foreground" />
                            <SelectValue placeholder="Format" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Formats</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full lg:w-auto"><Filter className="mr-2"/>Filter</Button>
            </div>
             <div className="p-4">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Events</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                        <TabsTrigger value="registered">My Registrations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <EventCard key={index} event={event} />
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="upcoming" className="mt-6">
                        <p className="text-muted-foreground text-center py-8">No upcoming events match your filters.</p>
                     </TabsContent>
                     <TabsContent value="past" className="mt-6">
                        <p className="text-muted-foreground text-center py-8">No past events match your filters.</p>
                     </TabsContent>
                      <TabsContent value="registered" className="mt-6">
                        <p className="text-muted-foreground text-center py-8">You haven't registered for any events yet.</p>
                     </TabsContent>
                </Tabs>
            </div>
        </Card>
    </div>
  );
}
