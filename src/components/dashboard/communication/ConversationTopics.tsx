
"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, MessageSquare, Presentation } from "lucide-react";

const topics = [
    { id: "job-interview", name: "Job Interview", description: "Practice common interview questions.", icon: <Briefcase /> },
    { id: "casual-conversation", name: "Casual Conversation", description: "Improve everyday English.", icon: <MessageSquare /> },
    { id: "presentation-skills", name: "Presentation Skills", description: "Develop confidence in public speaking.", icon: <Presentation /> },
];

export default function ConversationTopics({ selectedTopic, onSelectTopic }: { selectedTopic: string, onSelectTopic: (topic: string) => void }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Conversation Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topics.map(topic => (
                    <Card 
                        key={topic.id} 
                        onClick={() => onSelectTopic(topic.name)}
                        className={cn("p-4 flex items-center gap-4 cursor-pointer transition-all", 
                            selectedTopic === topic.name ? "ring-2 ring-primary neon-glow" : "hover:shadow-md"
                        )}
                    >
                        <div className="p-2 bg-primary/10 rounded-lg">{topic.icon}</div>
                        <div>
                            <h3 className="font-semibold">{topic.name}</h3>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
