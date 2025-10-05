
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase, Bookmark, Building, DollarSign, Lock } from "lucide-react";
import Image from "next/image";

export default function JobCard({ job }: { job: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow relative">
            {job.isUpcoming && <Badge className="absolute top-4 right-4">Upcoming</Badge>}
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1"><Building className="h-4 w-4" />{job.company}</div>
                                <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</div>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 p-2 bg-muted rounded-md"><Briefcase className="h-4 w-4 text-primary" /><span>{job.type}</span></div>
                    <div className="flex items-center gap-1.5 p-2 bg-muted rounded-md"><DollarSign className="h-4 w-4 text-primary" /><span>{job.salary}</span></div>
                </div>
                 <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
                 {job.isUpcoming ? (
                    <Button variant="secondary" disabled>
                        <Lock className="mr-2 h-4 w-4" /> Coming Soon
                    </Button>
                 ) : (
                    <Button>Apply Now</Button>
                 )}
            </CardFooter>
        </Card>
    )
}
