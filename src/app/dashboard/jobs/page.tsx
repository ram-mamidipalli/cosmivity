
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, PlusCircle, Filter } from "lucide-react";
import JobCard from "@/components/dashboard/jobs/JobCard";
import PostJobDialog from "@/components/dashboard/jobs/PostJobDialog";

const initialJobs = [
  {
    logo: "https://placehold.co/50x50.png",
    hint: "google logo",
    title: "Software Engineer, Frontend",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹15 - 25 LPA",
    type: "Full-time",
    posted: "2 days ago",
    tags: ["React", "TypeScript", "Next.js"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "microsoft logo",
    title: "Product Manager",
    company: "Microsoft",
    location: "Hyderabad, India",
    salary: "₹20 - 30 LPA",
    type: "Full-time",
    posted: "5 days ago",
    tags: ["Product Strategy", "Agile", "Roadmap"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "amazon logo",
    title: "Data Science Intern",
    company: "Amazon",
    location: "Remote",
    salary: "₹50,000/month",
    type: "Internship",
    posted: "1 week ago",
    tags: ["Python", "Machine Learning", "SQL"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "wipro logo",
    title: "UX/UI Designer",
    company: "Wipro",
    location: "Pune, India",
    salary: "₹8 - 12 LPA",
    type: "Full-time",
    posted: "3 days ago",
    tags: ["Figma", "User Research", "Prototyping"]
  },
   {
    logo: "https://placehold.co/50x50.png",
    hint: "infosys logo",
    title: "Backend Developer",
    company: "Infosys",
    location: "Mysore, India",
    salary: "₹12 - 18 LPA",
    type: "Full-time",
    posted: "1 day ago",
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    logo: "https://placehold.co/50x50.png",
    hint: "tcs logo",
    title: "Quality Assurance Engineer",
    company: "TCS",
    location: "Chennai, India",
    salary: "₹7 - 10 LPA",
    type: "Full-time",
    posted: "10 days ago",
    tags: ["Selenium", "JIRA", "API Testing"]
  },
];


export default function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs);

  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Job Board</h1>
                <p className="text-muted-foreground">Find your next career opportunity from thousands of openings.</p>
            </div>
            <PostJobDialog>
              <Button className="w-full sm:w-auto neon-glow"><PlusCircle className="mr-2"/>Post a Job</Button>
            </PostJobDialog>
        </header>

        <Card>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border-b">
                <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search job titles, keywords, or company" className="pl-10 pr-4 py-2 w-full" />
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
                                <SelectValue placeholder="Job Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Job Types</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full lg:w-auto"><Filter className="mr-2"/>Search</Button>
            </div>
            <div className="p-4">
                <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{jobs.length}</span> results</p>
            </div>
        </Card>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
            <aside className="lg:col-span-1">
                <Card className="sticky top-24">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Get Job Alerts</h3>
                        <p className="text-muted-foreground text-sm mb-4">Create a job alert to get notified of new opportunities.</p>
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
