
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Mic, Send, Volume2 } from "lucide-react";
import { aiEnglishCoach } from "@/ai/flows/ai-english-coach";

const suggestions = [
    "Hello, how are you today?",
    "What are your hobbies?",
    "Tell me about your goals",
    "What's your favorite subject?",
];

type Message = {
    sender: "user" | "ai";
    text: string;
};

export default function ChatInterface({ topic }: { topic: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "ai", text: "Hello! I'm your AI English conversation partner. I'm here to help you practice and improve your English speaking skills. What would you like to talk about today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await aiEnglishCoach({
                text: input,
                interviewContext: topic,
                conversationHistory: newMessages.slice(0, -1) // Send previous history
            });
            const aiMessage: Message = { sender: "ai", text: response.feedback };
            setMessages([...newMessages, aiMessage]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
            const errorMessage: Message = { sender: "ai", text: "Sorry, I'm having trouble connecting. Please try again in a moment." };
            setMessages([...newMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] border rounded-lg glassmorphic">
            <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender === 'ai' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`p-3 rounded-lg max-w-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p>{message.text}</p>
                                {message.sender === 'ai' && index > 0 && (
                                     <Button variant="ghost" size="icon" className="h-auto w-auto p-1 mt-2">
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            {message.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>You</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted">
                                <p className="italic">AI is thinking...</p>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                 <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-muted-foreground"/>
                    <h3 className="text-sm font-semibold text-muted-foreground">Topic Suggestions</h3>
                </div>
                <div className="flex gap-2 mb-4">
                    {suggestions.map(s => (
                        <Button key={s} variant="outline" size="sm" onClick={() => setInput(s)}>
                            {s}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Mic /></Button>
                    <Input 
                        placeholder="Type your message here..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send />
                    </Button>
                </div>
            </div>
        </div>
    );
}
