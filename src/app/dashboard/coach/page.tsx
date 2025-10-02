
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Upload, Download, RefreshCw, Save, CheckCircle, User, Star, Briefcase, FolderKanban, MessageSquare, Info, Link as LinkIcon, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dynamically import jspdf and html2canvas to ensure they are only loaded on the client-side
const jsPDF = dynamic(() => import("jspdf"), { ssr: false });
const html2canvas = dynamic(() => import("html2canvas"), { ssr: false });

const initialSkills = [
    { name: "JavaScript" }, { name: "TypeScript" }, { name: "React" }, { name: "Next.js" }, { name: "Node.js" }, { name: "Figma" },
];
const initialExperiences = [
    { company: "Upwork", role: "Sr. Frontend Developer", duration: "Nov 2021 - Present", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];
const initialProjects = [
    { title: "Project One", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Next.js"], image: "https://placehold.co/600x400.png" },
];
const initialTestimonials = [
    { name: "Client One", title: "CEO, Company A", quote: "Sagar is a very talented developer. He delivered a high-quality product on time and was a pleasure to work with.", avatar: "https://placehold.co/80x80.png" },
];


export default function CoachPage() {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [name, setName] = useState("Sagar");
  const [title, setTitle] = useState("Full-stack Developer");
  const [about, setAbout] = useState("I'm a full-stack developer with 5+ years of experience. I enjoy building solid and scalable frontend products with great user experiences.");
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [projects, setProjects] = useState(initialProjects);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const handleExportPdf = async () => {
    if (resumePreviewRef.current) {
        const JSPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        html2canvas(resumePreviewRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JSPDF('p', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    }
  };


  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Resume Builder</h1>
                <p className="text-muted-foreground">Create a professional resume that stands out to employers</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="mr-2"/> Import</Button>
                <Button className="neon-glow" onClick={handleExportPdf}><Download className="mr-2"/> Export PDF</Button>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Accordion type="single" collapsible defaultValue="personal-info" className="w-full">
                    {/* Personal Information */}
                    <AccordionItem value="personal-info">
                        <AccordionTrigger>
                            <div className="flex items-center gap-3"><User/> Personal Information</div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Professional Title</Label>
                                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    {/* About Section */}
                    <AccordionItem value="about">
                        <AccordionTrigger>
                            <div className="flex items-center gap-3"><Info/> About</div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="about">Summary</Label>
                                    <Textarea id="about" rows={5} value={about} onChange={(e) => setAbout(e.target.value)} />
                                </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    {/* Skills */}
                     <AccordionItem value="skills">
                        <AccordionTrigger><div className="flex items-center gap-3"><Star/> Skills</div></AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <p className="text-sm text-muted-foreground mb-4">Add your top technical and soft skills.</p>
                           {/* Add skill fields here */}
                        </AccordionContent>
                    </AccordionItem>
                    {/* Experience */}
                     <AccordionItem value="experience">
                        <AccordionTrigger><div className="flex items-center gap-3"><Briefcase/> Experience</div></AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <p className="text-sm text-muted-foreground mb-4">Detail your professional work experience.</p>
                           {/* Add experience fields here */}
                        </AccordionContent>
                    </AccordionItem>
                    {/* Projects */}
                     <AccordionItem value="projects">
                        <AccordionTrigger><div className="flex items-center gap-3"><FolderKanban/> Projects</div></AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <p className="text-sm text-muted-foreground mb-4">Showcase your best projects.</p>
                           {/* Add project fields here */}
                        </AccordionContent>
                    </AccordionItem>
                    {/* Testimonials */}
                     <AccordionItem value="testimonials">
                        <AccordionTrigger><div className="flex items-center gap-3"><MessageSquare/> Testimonials</div></AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <p className="text-sm text-muted-foreground mb-4">Include quotes from clients or colleagues.</p>
                           {/* Add testimonial fields here */}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>This is how your resume will look.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div ref={resumePreviewRef} className="bg-card p-6 rounded-lg min-h-[800px] border aspect-[1/1.414] shadow-lg">
                           {/* Hero Section */}
                           <div className="flex items-center gap-6 pb-6 border-b">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="man portrait"/>
                                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-3xl font-bold font-headline">{name}</h1>
                                    <h2 className="text-xl text-primary font-semibold">{title}</h2>
                                </div>
                           </div>
                           {/* Main Content */}
                           <div className="pt-6 grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-6">
                                    {/* About */}
                                    <div>
                                        <h3 className="text-lg font-bold border-b pb-1 mb-2">About</h3>
                                        <p className="text-sm text-muted-foreground">{about}</p>
                                    </div>
                                    {/* Experience */}
                                    <div>
                                        <h3 className="text-lg font-bold border-b pb-1 mb-2">Work Experience</h3>
                                        {experiences.map((exp, i) => (
                                            <div key={i} className="mb-4">
                                                <h4 className="font-semibold">{exp.role}</h4>
                                                <p className="text-sm text-primary">{exp.company} | {exp.duration}</p>
                                                <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Projects */}
                                    <div>
                                        <h3 className="text-lg font-bold border-b pb-1 mb-2">Projects</h3>
                                        {projects.map((proj, i) => (
                                            <div key={i} className="mb-4">
                                                <h4 className="font-semibold">{proj.title}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">{proj.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1 space-y-6">
                                    {/* Contact */}
                                    <div>
                                         <h3 className="text-lg font-bold border-b pb-1 mb-2">Contact</h3>
                                         {/* Contact details here */}
                                    </div>
                                    {/* Skills */}
                                    <div>
                                         <h3 className="text-lg font-bold border-b pb-1 mb-2">Skills</h3>
                                         <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => <Badge key={skill.name} variant="secondary">{skill.name}</Badge>)}
                                         </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
