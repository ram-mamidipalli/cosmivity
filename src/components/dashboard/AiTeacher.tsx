
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot } from "lucide-react";
import { aiTeacher } from "@/ai/flows/ai-teacher";
import { Message as GenkitMessage } from "genkit/experimental/ai";

type Message = {
    sender: "user" | "ai";
    text: string;
};

export default function AiTeacher() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "ai", text: "Hello! I'm your AI Teacher. Ask me anything about your studies, career, or any topic you're curious about." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        const history: GenkitMessage[] = newMessages.slice(0, -1).map(msg => new GenkitMessage({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: [{text: msg.text}]
        }));

        try {
            const response = await aiTeacher({
                query: currentInput,
                conversationHistory: history,
            });
            const aiMessage: Message = { sender: "ai", text: response.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
            const errorMessage: Message = { sender: "ai", text: "Sorry, I'm having trouble connecting. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary"/>
                    <div>
                        <CardTitle>AI Teacher</CardTitle>
                        <CardDescription>Your personal AI tutor</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4 min-h-0">
                <ScrollArea className="flex-grow h-96 pr-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'ai' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`p-3 rounded-lg max-w-sm break-words ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p>{message.text}</p>
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
                                    <p className="italic">Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="flex-shrink-0 flex items-center gap-2">
                    <Input 
                        placeholder="Ask a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
