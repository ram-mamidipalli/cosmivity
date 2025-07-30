
"use client";

import { Button } from "@/components/ui/button";
import { Users, Clock, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoomHeaderProps {
  title: string;
  participants: number;
  maxParticipants: number;
  time: string;
}

export default function RoomHeader({ title, participants, maxParticipants, time }: RoomHeaderProps) {
  const router = useRouter();
  
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
           <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
           </span>
          <h1 className="text-xl font-bold font-headline">{title}</h1>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span>{participants}/{maxParticipants}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span>{time}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="destructive" size="sm" onClick={() => router.push('/dashboard/challenges')}>
          <LogOut className="mr-2 h-4 w-4" />
          Leave Room
        </Button>
      </div>
    </header>
  );
}
