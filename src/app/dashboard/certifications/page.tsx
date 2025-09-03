
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationCard from "@/components/dashboard/certifications/CertificationCard";

const certifications = [
    {
        id: "gcp-architect",
        title: "Google Certified Professional - Cloud Architect",
        provider: "Google",
        level: "Professional",
        domain: "Cloud Computing",
        image: "https://placehold.co/600x400.png",
        hint: "google cloud logo",
        tags: ["GCP", "Cloud", "Architecture"],
    },
    {
        id: "aws-solutions-architect",
        title: "AWS Certified Solutions Architect - Associate",
        provider: "Amazon Web Services",
        level: "Associate",
        domain: "Cloud Computing",
        image: "https://placehold.co/600x400.png",
        hint: "aws logo",
        tags: ["AWS", "Cloud", "Solutions Architect"],
    },
    {
        id: "azure-fundamentals",
        title: "Microsoft Certified: Azure Fundamentals",
        provider: "Microsoft",
        level: "Fundamental",
        domain: "Cloud Computing",
        image: "https://placehold.co/600x400.png",
        hint: "azure logo",
        tags: ["Azure", "Microsoft", "Cloud"],
    },
    {
        id: "cissp",
        title: "Certified Information Systems Security Professional (CISSP)",
        provider: "(ISC)²",
        level: "Advanced",
        domain: "Cybersecurity",
        image: "https://placehold.co/600x400.png",
        hint: "cybersecurity lock",
        tags: ["Security", "CISSP", "Cybersecurity"],
    },
    {
        id: "pmp",
        title: "Project Management Professional (PMP)",
        provider: "PMI",
        level: "Professional",
        domain: "Project Management",
        image: "https://placehold.co/600x400.png",
        hint: "project plan chart",
        tags: ["PMP", "Management", "Agile"],
    },
    {
        id: "csm",
        title: "Certified ScrumMaster (CSM)",
        provider: "Scrum Alliance",
        level: "Fundamental",
        domain: "Agile & Scrum",
        image: "https://placehold.co/600x400.png",
        hint: "scrum board",
        tags: ["Scrum", "Agile", "CSM"],
    },
];

export default function CertificationsPage() {
  return (
    <div className="flex flex-col gap-8">
        <header>
            <h1 className="text-3xl font-bold font-headline">Explore Certifications</h1>
            <p className="text-muted-foreground">Validate your skills with industry-recognized certifications.</p>
        </header>

        <Card>
            <div className="p-4 flex flex-col sm:flex-row gap-4 border-b">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for certifications..." className="pl-10 pr-4 py-2 w-full" />
                </div>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Domain" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cloud">Cloud Computing</SelectItem>
                        <SelectItem value="security">Cybersecurity</SelectItem>
                        <SelectItem value="pm">Project Management</SelectItem>
                        <SelectItem value="agile">Agile & Scrum</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fundamental">Fundamental</SelectItem>
                        <SelectItem value="associate">Associate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto flex-shrink-0">
                    <ListFilter className="mr-2"/> Filter
                </Button>
            </div>
             <div className="p-4">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Certifications</TabsTrigger>
                        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {certifications.map((cert) => (
                                <CertificationCard key={cert.id} certification={cert} />
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="in-progress" className="mt-6">
                        <div className="text-center py-16">
                            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No certifications in progress</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Start preparing for a certification to track your progress here.
                            </p>
                            <Button className="mt-6">Explore Certifications</Button>
                        </div>
                     </TabsContent>
                      <TabsContent value="completed" className="mt-6">
                         <div className="text-center py-16">
                            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No certifications completed yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Your completed certifications will appear here.
                            </p>
                        </div>
                     </TabsContent>
                </Tabs>
            </div>
        </Card>
    </div>
  );
}
