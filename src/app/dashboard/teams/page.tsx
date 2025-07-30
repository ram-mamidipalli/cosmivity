
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, PlusCircle } from "lucide-react";

const communities = [
  {
    name: "Software Development",
    members: "12,500 members",
    description: "Discuss everything about coding, from web dev to machine learning.",
    joined: false,
  },
  {
    name: "Product Management",
    members: "8,200 members",
    description: "Share insights on product strategy, roadmaps, and user feedback.",
    joined: true,
  },
  {
    name: "Data Science & Analytics",
    members: "10,100 members",
    description: "A place for data enthusiasts to talk about models, tools, and techniques.",
    joined: false,
  },
  {
    name: "UI/UX Design",
    members: "6,700 members",
    description: "Connect with designers to share portfolios and discuss design principles.",
    joined: false,
  },
  {
    name: "Career Starters",
    members: "23,000 members",
    description: "A community for students and recent grads to navigate their early careers.",
    joined: false,
  },
  {
    name: "Test Community",
    members: "1 members",
    description: "A test community for demonstration purposes.",
    joined: true,
  },
];


export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Explore Communities</h1>
                <p className="text-muted-foreground">Find and join communities of peers, mentors, and industry experts.</p>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search communities..." className="pl-10 pr-4 py-2 w-full" />
                </div>
                 <Button className="neon-glow flex-shrink-0">
                    <PlusCircle className="mr-2"/> Create Community
                </Button>
            </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Users className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{community.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{community.members}</p>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{community.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        {community.joined ? (
                             <Button variant="secondary" className="w-full">Open Forum</Button>
                        ) : (
                            <Button variant="outline" className="w-full">Join Community</Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </main>
    </div>
  );
}
