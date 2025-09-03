
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, PlusCircle, Filter } from "lucide-react";
import JobCard from "@/components/dashboard/jobs/JobCard";
import PostJobDialog from "@/components/dashboard/jobs/PostJobDialog";

const initialInternships = [
  {
    logo: "https://placehold.co/50x50.png",
    hint: "google logo",
    title: "Software Engineering Intern",
    company: "Google",
    location: "Remote",
    salary: "₹80,000/month stipend",
    type: "Internship",
    posted: "1 day ago",
    tags: ["Summer", "C++", "Algorithms"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "meta logo",
    title: "Data Science Intern",
    company: "Meta",
    location: "Bangalore, India",
    salary: "₹90,000/month stipend",
    type: "Internship",
    posted: "3 days ago",
    tags: ["Python", "PyTorch", "6 Months"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "adobe logo",
    title: "UX Design Intern",
    company: "Adobe",
    location: "Noida, India",
    salary: "₹65,000/month stipend",
    type: "Internship",
    posted: "1 week ago",
    tags: ["Figma", "User Research", "3 Months"]
  },
   {
    logo: "https://placehold.co/50x50.png",
    hint: "salesforce logo",
    title: "Product Management Intern",
    company: "Salesforce",
    location: "Hyderabad, India",
    salary: "₹75,000/month stipend",
    type: "Internship",
    posted: "4 days ago",
    tags: ["Product", "Agile", "Summer"]
  },
];


export default function InternshipsPage() {
  const [internships, setInternships] = useState(initialInternships);

  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Internship Board</h1>
                <p className="text-muted-foreground">Find your next internship opportunity from thousands of openings.</p>
            </div>
            <PostJobDialog>
              <Button className="w-full sm:w-auto neon-glow"><PlusCircle className="mr-2"/>Post an Internship</Button>
            </PostJobDialog>
        </header>

        <Card>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border-b">
                <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search titles, keywords, or company" className="pl-10 pr-4 py-2 w-full" />
                </div>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Location" className="pl-10 pr-4 py-2 w-full" />
                </div>
                <div className="relative">
                     <Select>
                        <SelectTrigger>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                <SelectValue placeholder="Internship Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="summer">Summer</SelectItem>
                            <SelectItem value="winter">Winter</SelectItem>
                            <SelectItem value="6-months">6 Months</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full lg:w-auto"><Filter className="mr-2"/>Search</Button>
            </div>
            <div className="p-4">
                <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{internships.length}</span> results</p>
            </div>
        </Card>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {internships.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
            <aside className="lg:col-span-1">
                <Card className="sticky top-24">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Get Internship Alerts</h3>
                        <p className="text-muted-foreground text-sm mb-4">Create an alert to get notified of new internship opportunities.</p>
                         <div className="space-y-4">
                            <Input placeholder="your.email@example.com" />
                            <Button className="w-full">Create Alert</Button>
                         </div>
                    </div>
                </Card>
            </aside>
        </main>
    </div>
  );
}
