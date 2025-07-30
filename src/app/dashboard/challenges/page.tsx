
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, PlusCircle, RefreshCw, Clock, Eye, TrendingUp, MessageSquare, Hourglass } from "lucide-react";

const stats = [
    { label: "Active Users", value: "156", icon: <Users className="text-primary"/> },
    { label: "Live Rooms", value: "23", icon: <MessageSquare className="text-primary"/> },
    { label: "Debates Today", value: "89", icon: <TrendingUp className="text-primary"/> },
    { label: "Avg Duration", value: "25m", icon: <Hourglass className="text-primary"/> }
];

const activeRooms = [
    { 
        title: "AI in Education Debate", 
        status: "Live", 
        question: "Should AI replace human teachers in education?", 
        participants: "3/8", 
        time: "15 min", 
        host: "Sarah Chen", 
        avatars: ["https://placehold.co/40x40.png", "https://placehold.co/40x40.png", "https://placehold.co/40x40.png"],
        hints: ["woman portrait", "man portrait", "woman headshot"]
    },
    { 
        title: "Remote Work Discussion", 
        status: "Waiting", 
        question: "Is remote work better than office work?", 
        participants: "2/6", 
        time: "5 min", 
        host: "Alex Kumar", 
        avatars: ["https://placehold.co/40x40.png", "https://placehold.co/40x40.png"],
        hints: ["man headshot", "woman smiling"]
    },
    { 
        title: "Social Media Regulation", 
        status: "Full", 
        question: "Should social media platforms be regulated by government?", 
        participants: "4/4", 
        time: "22 min", 
        host: "David Lee", 
        avatars: ["https://placehold.co/40x40.png", "https://placehold.co/40x40.png", "https://placehold.co/40x40.png", "https://placehold.co/40x40.png"],
        hints: ["person", "person", "person", "person"]
    }
];

const trendingTopics = [
    {
        title: "Should AI replace human teachers in education?",
        description: "Explore the potential benefits and drawbacks of artificial intelligence in educational settings. Discuss the impact on personalized learning, teacher-student relationships, and educational outcomes.",
        level: "Intermediate",
        rooms: 8,
        time: 25
    },
    {
        title: "Is remote work better than office work?",
        description: "Debate the pros and cons of remote work versus traditional office environments. Consider productivity, work-life balance, collaboration, and company culture.",
        level: "Beginner",
        rooms: 12,
        time: 20
    },
     {
        title: "Should social media platforms be regulated by government?",
        description: "Discuss the balance between free speech and content moderation. Examine the role of government in regulating social media platforms and protecting users.",
        level: "Advanced",
        rooms: 5,
        time: 35
    },
     {
        title: "Is climate change the most pressing global issue?",
        description: "Analyze the urgency of climate change compared to other global challenges like poverty, healthcare, and education. Discuss priorities and resource allocation.",
        level: "Intermediate",
        rooms: 6,
        time: 30
    }
]

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Live": return "destructive";
        case "Waiting": return "secondary";
        case "Full": return "default";
        default: return "outline";
    }
}


export default function ChallengesPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Live Debate Rooms</h1>
                <p className="text-muted-foreground">Join real-time discussions to build communication confidence and critical thinking skills.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search topics or rooms..." className="pl-10 pr-4 py-2 w-full" />
                </div>
                <div className="flex items-center gap-2">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="trending">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trending" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="trending">Trending</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="popular">Popular</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="neon-glow"><PlusCircle className="mr-2"/>Create Room</Button>
                </div>
            </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">{stat.icon}</div>
                        <div>
                            <p className="text-2xl font-bold font-code">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>

        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold font-headline">Active Rooms</h2>
                <Button variant="ghost" size="sm"><RefreshCw className="mr-2 h-4 w-4"/>Refresh</Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeRooms.map((room, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{room.title}</CardTitle>
                                <Badge variant={getStatusBadgeVariant(room.status)}>{room.status}</Badge>
                            </div>
                            <CardDescription>{room.question}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                           <div className="flex items-center -space-x-2">
                                {room.avatars.map((avatar, i) => (
                                    <Avatar key={i} className="border-2 border-background">
                                        <AvatarImage src={avatar} data-ai-hint={room.hints[i]}/>
                                        <AvatarFallback>{room.host[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                           </div>
                           <div className="flex justify-between items-center text-sm text-muted-foreground">
                             <div className="flex items-center gap-1.5"><Users className="h-4 w-4"/><span>{room.participants}</span></div>
                             <div className="flex items-center gap-1.5"><Clock className="h-4 w-4"/><span>{room.time}</span></div>
                             <span>{room.host}</span>
                           </div>
                        </CardContent>
                        <CardContent className="flex items-center gap-2">
                            <Button variant="outline" className="w-full"><Eye className="mr-2"/>Preview</Button>
                            <Button className="w-full neon-glow" disabled={room.status === 'Full'}>Join</Button>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </section>

        <section>
             <h2 className="text-2xl font-bold font-headline mb-4">Trending Topics</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trendingTopics.map((topic, index) => (
                    <Card key={index}>
                         <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{topic.title}</h3>
                                <Badge variant="outline">{topic.level}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{topic.description}</p>
                            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4"/>{topic.rooms} rooms</span>
                                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/>{topic.time} min</span>
                                </div>
                                <span className="flex items-center gap-1.5 font-semibold text-primary"><TrendingUp className="h-4 w-4"/>Trending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline">Join Room</Button>
                                <Button className="neon-glow flex-1"><PlusCircle className="mr-2"/>Create Room</Button>
                            </div>
                         </CardContent>
                    </Card>
                ))}
             </div>
        </section>
    </div>
  );
}
