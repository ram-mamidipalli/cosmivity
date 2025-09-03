
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function PostJobDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const handlePostJob = () => {
    // In a real app, you'd handle form submission to a backend here.
    toast({
        title: "Job Posted Successfully!",
        description: "Your job listing has been published and is now visible to candidates.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline">Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the details below to find the perfect candidate for your open position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" placeholder="e.g., Software Engineer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="e.g., Google" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., Bangalore, India or Remote" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             <div className="grid gap-2">
                <Label htmlFor="salary-range">Salary Range (LPA)</Label>
                <Input id="salary-range" placeholder="e.g., 15 - 25 LPA" />
             </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea id="description" placeholder="Describe the role, responsibilities, and requirements." rows={6}/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="skills">Required Skills</Label>
            <Input id="skills" placeholder="e.g., React, Node.js, Python (comma-separated)" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
                Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="neon-glow" onClick={handlePostJob}>
              Post Job
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
