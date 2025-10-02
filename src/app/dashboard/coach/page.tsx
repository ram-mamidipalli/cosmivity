
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Upload, Download, Edit, Save, PlusCircle, Trash2, Mail, Phone, Linkedin, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Dynamically import jspdf and html2canvas to ensure they are only loaded on the client-side
const jsPDF = dynamic(() => import("jspdf"), { ssr: false });
const html2canvas = dynamic(() => import("html2canvas"), { ssr: false });

const initialEducation = [{
    school: "University of Example",
    degree: "Bachelor of Science in Computer Science",
    duration: "2018 - 2022"
}];

const initialExperience = [{
    company: "Tech Solutions Inc.",
    role: "Software Engineer",
    duration: "Jun 2022 - Present",
    description: "Developed and maintained web applications using React and Node.js. Collaborated with a team of 5 engineers to deliver features on-time."
}];

const initialProjects = [{
    name: "Portfolio Website",
    description: "A personal portfolio to showcase my projects and skills, built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"]
}];

const initialSkills = ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "SQL", "Git"];

export default function CoachPage() {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Form State
  const [name, setName] = useState("Aakash");
  const [title, setTitle] = useState("Full-Stack Developer");
  const [email, setEmail] = useState("aakash@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/aakash");
  const [github, setGithub] = useState("github.com/aakash");

  const [summary, setSummary] = useState("Innovative Full-Stack Developer with 2+ years of experience in building and maintaining responsive web applications. Proficient in JavaScript, React, and Node.js, with a passion for creating intuitive user interfaces.");

  const [education, setEducation] = useState(initialEducation);
  const [experiences, setExperiences] =useState(initialExperience);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);

  const handleExportPdf = async () => {
    if (resumePreviewRef.current) {
        const JSPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        html2canvas(resumePreviewRef.current, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JSPDF('p', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${name.toLowerCase().replace(" ", "-")}-resume.pdf`);
        });
    }
  };

  const handleAddItem = (section: 'education' | 'experiences' | 'projects' | 'skills') => {
      if (section === 'education') setEducation([...education, { school: "", degree: "", duration: "" }]);
      if (section === 'experiences') setExperiences([...experiences, { company: "", role: "", duration: "", description: "" }]);
      if (section === 'projects') setProjects([...projects, { name: "", description: "", tags: [] }]);
      if (section === 'skills') setSkills([...skills, "New Skill"]);
  }

  const handleRemoveItem = (section: 'education' | 'experiences' | 'projects' | 'skills', index: number) => {
      if (section === 'education') setEducation(education.filter((_, i) => i !== index));
      if (section === 'experiences') setExperiences(experiences.filter((_, i) => i !== index));
      if (section === 'projects') setProjects(projects.filter((_, i) => i !== index));
      if (section === 'skills') setSkills(skills.filter((_, i) => i !== index));
  }
  
  const handleItemChange = (section: string, index: number, field: string, value: string | string[]) => {
    if (section === 'education') {
        const newEducation = [...education];
        (newEducation[index] as any)[field] = value;
        setEducation(newEducation);
    }
     if (section === 'experiences') {
        const newExperiences = [...experiences];
        (newExperiences[index] as any)[field] = value;
        setExperiences(newExperiences);
    }
     if (section === 'projects') {
        const newProjects = [...projects];
        (newProjects[index] as any)[field] = Array.isArray(value) ? value : (value as string).split(',').map(s => s.trim());
        setProjects(newProjects);
    }
    if (section === 'skills') {
        const newSkills = [...skills];
        newSkills[index] = value as string;
        setSkills(newSkills);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <Accordion type="multiple" defaultValue={["personal-info", "summary"]} className="w-full">
                    <AccordionItem value="personal-info">
                        <AccordionTrigger>Personal Information</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                                <div className="space-y-2"><Label>Professional Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                                <div className="space-y-2"><Label>Phone</Label><Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>LinkedIn Profile URL</Label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} /></div>
                                <div className="space-y-2"><Label>GitHub Profile URL</Label><Input value={github} onChange={e => setGithub(e.target.value)} /></div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="summary">
                        <AccordionTrigger>Professional Summary</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg">
                           <div className="space-y-2">
                                <Label>Summary</Label>
                                <Textarea value={summary} onChange={e => setSummary(e.target.value)} rows={5} />
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="education">
                        <AccordionTrigger>Education</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem('education', index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>School/University</Label><Input value={edu.school} onChange={e => handleItemChange('education', index, 'school', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Degree</Label><Input value={edu.degree} onChange={e => handleItemChange('education', index, 'degree', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Duration</Label><Input value={edu.duration} onChange={e => handleItemChange('education', index, 'duration', e.target.value)} /></div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={() => handleAddItem('education')}><PlusCircle className="mr-2"/>Add Education</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="experience">
                        <AccordionTrigger>Work Experience</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                            {experiences.map((exp, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem('experiences', index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Company</Label><Input value={exp.company} onChange={e => handleItemChange('experiences', index, 'company', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Role</Label><Input value={exp.role} onChange={e => handleItemChange('experiences', index, 'role', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Duration</Label><Input value={exp.duration} onChange={e => handleItemChange('experiences', index, 'duration', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Description</Label><Textarea value={exp.description} onChange={e => handleItemChange('experiences', index, 'description', e.target.value)} /></div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={() => handleAddItem('experiences')}><PlusCircle className="mr-2"/>Add Experience</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="projects">
                        <AccordionTrigger>Projects</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           {projects.map((proj, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem('projects', index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Project Name</Label><Input value={proj.name} onChange={e => handleItemChange('projects', index, 'name', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Description</Label><Textarea value={proj.description} onChange={e => handleItemChange('projects', index, 'description', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Technologies (comma-separated)</Label><Input value={proj.tags.join(', ')} onChange={e => handleItemChange('projects', index, 'tags', e.target.value)} /></div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={() => handleAddItem('projects')}><PlusCircle className="mr-2"/>Add Project</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="skills">
                        <AccordionTrigger>Skills</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                             {skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input value={skill} onChange={e => handleItemChange('skills', index, '', e.target.value)} />
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('skills', index)}><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            ))}
                           </div>
                            <Button variant="outline" onClick={() => handleAddItem('skills')}><PlusCircle className="mr-2"/>Add Skill</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="lg:col-span-1 space-y-8 sticky top-24">
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>This is how your resume will look.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div ref={resumePreviewRef} className="bg-card p-8 rounded-lg min-h-[800px] border shadow-lg aspect-[1/1.414] text-gray-800 font-sans">
                            <header className="text-center border-b pb-4">
                                <h1 className="text-4xl font-bold font-serif">{name}</h1>
                                <p className="text-lg text-primary">{title}</p>
                                <div className="flex justify-center items-center gap-4 text-sm mt-2 text-gray-600">
                                    <span className="flex items-center gap-1.5"><Mail className="h-4 w-4"/>{email}</span>
                                    <span className="flex items-center gap-1.5"><Phone className="h-4 w-4"/>{phone}</span>
                                    <span className="flex items-center gap-1.5"><Linkedin className="h-4 w-4"/>{linkedin}</span>
                                    <span className="flex items-center gap-1.5"><Github className="h-4 w-4"/>{github}</span>
                                </div>
                            </header>
                             <section className="mt-6">
                                <h2 className="text-xl font-bold font-serif border-b-2 border-gray-200 pb-1 mb-2">Summary</h2>
                                <p className="text-sm">{summary}</p>
                            </section>
                            <section className="mt-6">
                                <h2 className="text-xl font-bold font-serif border-b-2 border-gray-200 pb-1 mb-2">Work Experience</h2>
                                {experiences.map((exp, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-md font-semibold">{exp.role}</h3>
                                            <p className="text-xs font-mono">{exp.duration}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                                        <p className="text-sm mt-1">{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                            <section className="mt-6">
                                <h2 className="text-xl font-bold font-serif border-b-2 border-gray-200 pb-1 mb-2">Education</h2>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-2">
                                         <div className="flex justify-between items-baseline">
                                            <h3 className="text-md font-semibold">{edu.school}</h3>
                                            <p className="text-xs font-mono">{edu.duration}</p>
                                        </div>
                                        <p className="text-sm">{edu.degree}</p>
                                    </div>
                                ))}
                            </section>
                            <section className="mt-6">
                                <h2 className="text-xl font-bold font-serif border-b-2 border-gray-200 pb-1 mb-2">Projects</h2>
                                {projects.map((proj, i) => (
                                     <div key={i} className="mb-2">
                                        <h3 className="text-md font-semibold">{proj.name}</h3>
                                        <p className="text-sm mt-1">{proj.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">Tech: {proj.tags.join(', ')}</p>
                                    </div>
                                ))}
                            </section>
                             <section className="mt-6">
                                <h2 className="text-xl font-bold font-serif border-b-2 border-gray-200 pb-1 mb-2">Skills</h2>
                                <p className="text-sm">{skills.join(' • ')}</p>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

    