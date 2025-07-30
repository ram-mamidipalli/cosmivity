
"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Copy, Share2, PlusCircle, Lock, Globe } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function CreateRoomDialog({ children }: { children: React.ReactNode }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [roomCreated, setRoomCreated] = useState(false);
  const { toast } = useToast();

  const handleCreateRoom = () => {
    // In a real app, you'd handle room creation logic here
    setRoomCreated(true);
    toast({
        title: "Room Created Successfully!",
        description: "Your room is ready. Share the link with others to join.",
    });
  };

  const roomLink = "https://cosmivity.com/room/xyz-123";

  const copyToClipboard = () => {
      navigator.clipboard.writeText(roomLink);
      toast({
          title: "Link Copied!",
      })
  }

  const resetState = () => {
      setRoomCreated(false);
      setIsPrivate(false);
      setSchedule(false);
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetState()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        {!roomCreated ? (
            <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-headline">Create a Debate Room</DialogTitle>
                  <DialogDescription>
                    Setup your room topic, privacy, and schedule to start a discussion.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" placeholder="e.g., The Future of Artificial Intelligence" />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea id="description" placeholder="A brief description of what will be discussed." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="privacy">Privacy</Label>
                        <Select onValueChange={(value) => setIsPrivate(value === 'private')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public"><div className="flex items-center gap-2"><Globe className="h-4 w-4"/>Public</div></SelectItem>
                                <SelectItem value="private"><div className="flex items-center gap-2"><Lock className="h-4 w-4"/>Private</div></SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                     {isPrivate && (
                         <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                         </div>
                     )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="schedule-switch" checked={schedule} onCheckedChange={setSchedule} />
                    <Label htmlFor="schedule-switch">Schedule for later</Label>
                  </div>
                  {schedule && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                  )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="neon-glow" onClick={handleCreateRoom}>
                    {schedule ? 'Schedule Room' : 'Create Room'}
                  </Button>
                </DialogFooter>
            </>
        ) : (
            <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-headline">Room Created!</DialogTitle>
                  <DialogDescription>
                    Share the link below to invite others to your room.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <p className="text-sm text-muted-foreground">Your room is ready to go. You can copy the link or share it directly.</p>
                    <div className="flex space-x-2">
                        <Input value={roomLink} readOnly />
                        <Button onClick={copyToClipboard} size="icon" variant="outline">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => window.open(roomLink, '_blank')} variant="outline">
                        Go to Room
                    </Button>
                     <DialogClose asChild>
                        <Button type="button" className="neon-glow">
                            Done
                        </Button>
                     </DialogClose>
                </DialogFooter>
            </>
        )}
        
      </DialogContent>
    </Dialog>
  );
}
