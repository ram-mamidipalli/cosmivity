
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, Hand, ThumbsUp, Heart, Laugh, Wow, HandPlatter, LogOut } from "lucide-react";

interface Participant {
  name: string;
  avatar: string;
  isHost?: boolean;
  isMuted?: boolean;
}

interface VideoParticipantsProps {
  participants: Participant[];
}

export default function VideoParticipants({ participants }: VideoParticipantsProps) {
  const mainParticipant = participants[0];
  const otherParticipants = participants.slice(1);

  return (
    <div className="flex flex-col h-full gap-4">
      <Card className="flex-grow relative">
        <img src={mainParticipant.avatar} alt={mainParticipant.name} className="object-cover w-full h-full rounded-lg" data-ai-hint="woman portrait" />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {mainParticipant.name}
        </div>
      </Card>
      <div className="flex-shrink-0 grid grid-cols-4 gap-4">
        {otherParticipants.map((p, i) => (
          <Card key={i} className="relative aspect-video">
            <img src={p.avatar} alt={p.name} className="object-cover w-full h-full rounded-lg" data-ai-hint="person" />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs">
              {p.name}
            </div>
            {p.isMuted && (
              <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full">
                <MicOff className="h-4 w-4 text-white" />
              </div>
            )}
          </Card>
        ))}
      </div>
      <Card className="flex-shrink-0">
        <CardContent className="p-4 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><Mic className="h-6 w-6"/></Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><Video className="h-6 w-6"/></Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><Hand className="h-6 w-6"/></Button>
          <Button variant="destructive" size="icon" className="rounded-full h-12 w-12"><LogOut className="h-6 w-6"/></Button>
        </CardContent>
      </Card>
    </div>
  );
}
