
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

export default function JoinRoomDialog({ children }: { children: React.ReactNode }) {

  const handleJoinRoom = () => {
    // In a real app, you'd handle room joining logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline">Join a Private Room</DialogTitle>
          <DialogDescription>
            Enter the Room ID and password to join the session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="room-id">Room ID</Label>
            <Input id="room-id" placeholder="Enter the Room ID" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter the password" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
                Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="neon-glow" onClick={handleJoinRoom}>
              <KeyRound className="mr-2 h-4 w-4"/> Join Room
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
