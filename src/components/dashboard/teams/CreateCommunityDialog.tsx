
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
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function CreateCommunityDialog({ children }: { children: React.ReactNode }) {

  const handleCreateCommunity = () => {
    // In a real app, you'd handle community creation logic here
    console.log("Community created!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline">Create a New Community</DialogTitle>
          <DialogDescription>
            Build a space for members to connect and share.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="space-y-2 text-center">
                <div className="mx-auto flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <Label htmlFor="community-icon" className="text-sm font-medium text-primary cursor-pointer">
                    Upload Community Icon
                    <Input id="community-icon" type="file" className="sr-only" />
                </Label>
            </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Community Name</Label>
            <Input id="name" placeholder="e.g., Software Development" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="A brief description of your community's purpose." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
                Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="neon-glow" onClick={handleCreateCommunity}>
              Create Community
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
