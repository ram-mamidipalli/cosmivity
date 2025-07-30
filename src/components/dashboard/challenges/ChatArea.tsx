
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageCircle, ThumbsUp, ThumbsDown, Heart, Smile } from "lucide-react";

interface Message {
  type?: 'event';
  sender?: string;
  time?: string;
  text: string;
  avatar?: string;
}

interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="p-3 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-primary">Current Topic</h3>
            <p className="text-foreground">Should AI replace human teachers in education?</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 min-h-0">
        <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold flex items-center gap-2"><MessageCircle className="h-5 w-5"/>Chat</h3>
            <span className="text-sm text-muted-foreground">4 participants</span>
        </div>
        <ScrollArea className="flex-grow pr-4 -mr-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              msg.type === 'event' ? (
                <div key={index} className="text-center text-xs text-muted-foreground py-1">
                    {msg.text}
                </div>
              ) : (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar} data-ai-hint="person" />
                    <AvatarFallback>{msg.sender?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{msg.sender}</span>
                      <span className="text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className="bg-muted p-3 rounded-lg mt-1">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </ScrollArea>
        <div className="flex-shrink-0 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><ThumbsUp/></Button>
                <Button variant="outline" size="icon"><ThumbsDown/></Button>
                <Button variant="outline" size="icon"><Heart/></Button>
                <Button variant="outline" size="icon"><Smile/></Button>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." />
                <Button><Send /></Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
