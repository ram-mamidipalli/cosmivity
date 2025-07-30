
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConversationTopics from "@/components/dashboard/communication/ConversationTopics";
import ChatInterface from "@/components/dashboard/communication/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Mic, Video } from "lucide-react";

const lessons = [
    { title: "Mastering the STAR Method for Interviews", category: "Interview Skills" },
    { title: "Body Language for Confident Presentations", category: "Public Speaking" },
    { title: "Techniques for Active Listening", category: "Interpersonal Skills" },
    { title: "Crafting a Compelling Personal Story", category: "Storytelling" },
];

export default function CommunicationPage() {
    const [topic, setTopic] = useState<string>("Job Interview");
    const router = useRouter();

    const handleEndSession = () => {
        router.push("/dashboard");
    }
    
    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Communication Lab</h1>
                    <p className="text-muted-foreground">Practice and improve your verbal skills with our AI coach.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-code text-sm">Session: 00:00</span>
                    <Button variant="outline" onClick={handleEndSession}>End Session</Button>
                </div>
            </header>
            
            <div className="space-y-8">
                <ConversationTopics selectedTopic={topic} onSelectTopic={setTopic} />
                <ChatInterface topic={topic} />
            </div>

            <section>
                <h2 className="text-2xl font-bold font-headline mb-4">Lessons & Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lessons.map((lesson, index) => (
                        <Card key={index} className="glassmorphic hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{lesson.category}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
