
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
import jsPDF from "jspdf";

const initialDetails = {
    name: "Sagar",
    phone: "+91-9876543210",
    email: "sagar@example.com",
    linkedin: "linkedin.com/in/sagar-dev",
    github: "github.com/sagar-dev"
};

const initialSummary = "I'm a full-stack developer with 5+ years of experience. I enjoy building solid and scalable frontend products with great user experiences.";

const initialEducation = [
    { school: "University of Technology", degree: "B.E. in Computer Engineering (GPA: 8.5/10)", duration: "2017 - 2021", location: "Delhi, India" },
    { school: "City College", degree: "Senior Secondary (95%)", duration: "2015 - 2017", location: "Delhi, India" },
    { school: "Public School", degree: "Secondary School (10 CGPA)", duration: "2014 - 2015", location: "Delhi, India" }
];

const initialProjects = [
    { title: "E-commerce Platform", tech: "React, Node.js, MongoDB, Express", description: "Developed a full-stack e-commerce website with features like product catalog, shopping cart, user authentication, and payment gateway integration. Implemented a responsive user interface using React and Bootstrap. Built a RESTful API with Node.js and Express for backend services." },
    { title: "Task Management App", tech: "Next.js, Firebase, Tailwind CSS", description: "Created a task management application to help users organize their daily tasks. Features include creating, updating, and deleting tasks, setting due dates, and categorizing tasks into different projects. Used Firebase for real-time database and authentication." },
    { title: "Portfolio Website", tech: "HTML, CSS, JavaScript", description: "Designed and built a personal portfolio website to showcase projects and skills. Focused on creating a clean and modern design with a user-friendly interface. Optimized for performance and responsiveness across different devices." }
];

const initialOtherProjects = "Weather App, Blog Platform, Chat Application.";

const initialSkills = [
    { category: "Programming Languages", skills: "JavaScript, Python, Java, C++" },
    { category: "Frontend", skills: "React, Next.js, HTML, CSS, Tailwind CSS" },
    { category: "Backend", skills: "Node.js, Express, Firebase" },
    { category: "Database", skills: "MongoDB, SQL" },
    { category: "Tools & Others", skills: "Git, Docker, Figma, Agile" },
];

const initialCertifications = [
    { name: "Full-Stack Web Development", link: "Certificate Link" },
    { name: "Advanced JavaScript", link: "Certificate Link" },
];

const initialActivities = [
    { title: "Coding Club", role: "President", description: "Organized coding competitions and workshops for students." },
    { title: "Hackathon Participant", role: "", description: "Participated in multiple hackathons and won 'Best Project Award' in one." },
]


export default function CoachPage() {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Form State
  const [details, setDetails] = useState(initialDetails);
  const [summary, setSummary] = useState(initialSummary);
  const [education, setEducation] = useState(initialEducation);
  const [projects, setProjects] = useState(initialProjects);
  const [otherProjects, setOtherProjects] = useState(initialOtherProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [activities, setActivities] = useState(initialActivities);

  const handleExportPdf = async () => {
    if (resumePreviewRef.current) {
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        pdf.html(resumePreviewRef.current, {
            callback: function (doc) {
                doc.save(`${details.name.toLowerCase().replace(" ", "-")}-resume.pdf`);
            },
            autoPaging: 'text',
            width: 595, // A4 width in points
            windowWidth: resumePreviewRef.current.scrollWidth,
            margin: [40, 40, 40, 40],
        });

        toast({
            title: "Resume Exported!",
            description: "Your resume has been downloaded as a PDF.",
        });
    }
  };

  
  const handleDetailChange = (field: keyof typeof details, value: string) => {
      setDetails(prev => ({...prev, [field]: value}));
  }

  const handleDynamicChange = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number, field: string, value: string) => {
      setter(prev => {
          const newArr = [...prev];
          newArr[index] = {...newArr[index], [field]: value};
          return newArr;
      })
  }

  const handleAddItem = (setter: React.Dispatch<React.SetStateAction<any[]>>, newItem: any) => {
      setter(prev => [...prev, newItem]);
  }

  const handleRemoveItem = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number) => {
      setter(prev => prev.filter((_, i) => i !== index));
  }


  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Resume Builder</h1>
                <p className="text-muted-foreground">Create a professional resume that stands out to employers</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <Accordion type="multiple" defaultValue={["personal-info", "summary"]} className="w-full">
                    <AccordionItem value="personal-info">
                        <AccordionTrigger>Personal Information</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                            <div className="space-y-2"><Label>Full Name</Label><Input value={details.name} onChange={e => handleDetailChange('name', e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Phone</Label><Input type="tel" value={details.phone} onChange={e => handleDetailChange('phone', e.target.value)} /></div>
                                <div className="space-y-2"><Label>Email</Label><Input type="email" value={details.email} onChange={e => handleDetailChange('email', e.target.value)} /></div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>LinkedIn Profile URL</Label><Input value={details.linkedin} onChange={e => handleDetailChange('linkedin', e.target.value)} /></div>
                                <div className="space-y-2"><Label>GitHub Profile URL</Label><Input value={details.github} onChange={e => handleDetailChange('github', e.target.value)} /></div>
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
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem(setEducation, index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>School/University</Label><Input value={edu.school} onChange={e => handleDynamicChange(setEducation, index, 'school', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Degree & GPA</Label><Input value={edu.degree} onChange={e => handleDynamicChange(setEducation, index, 'degree', e.target.value)} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Duration</Label><Input value={edu.duration} onChange={e => handleDynamicChange(setEducation, index, 'duration', e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Location</Label><Input value={edu.location} onChange={e => handleDynamicChange(setEducation, index, 'location', e.target.value)} /></div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={() => handleAddItem(setEducation, { school: "", degree: "", duration: "", location: "" })}><PlusCircle className="mr-2"/>Add Education</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="projects">
                        <AccordionTrigger>Projects</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           {projects.map((proj, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem(setProjects, index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Project Title</Label><Input value={proj.title} onChange={e => handleDynamicChange(setProjects, index, 'title', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Technologies</Label><Input value={proj.tech} onChange={e => handleDynamicChange(setProjects, index, 'tech', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Description (use new lines for bullet points)</Label><Textarea value={proj.description} onChange={e => handleDynamicChange(setProjects, index, 'description', e.target.value)} rows={5}/></div>
                                </div>
                            ))}
                            <Button variant="outline" onClick={() => handleAddItem(setProjects, { title: "", tech: "", description: "" })}><PlusCircle className="mr-2"/>Add Project</Button>
                            <div className="space-y-2 pt-4">
                                <Label>Other Projects (comma-separated)</Label>
                                <Input value={otherProjects} onChange={e => setOtherProjects(e.target.value)} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="skills">
                        <AccordionTrigger>Skills</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           {skills.map((skill, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem(setSkills, index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Skill Category</Label><Input value={skill.category} onChange={e => handleDynamicChange(setSkills, index, 'category', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Skills (comma-separated)</Label><Input value={skill.skills} onChange={e => handleDynamicChange(setSkills, index, 'skills', e.target.value)} /></div>
                                </div>
                           ))}
                            <Button variant="outline" onClick={() => handleAddItem(setSkills, { category: "", skills: "" })}><PlusCircle className="mr-2"/>Add Skill Category</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="certifications">
                        <AccordionTrigger>Certifications</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           {certifications.map((cert, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem(setCertifications, index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Certification Name</Label><Input value={cert.name} onChange={e => handleDynamicChange(setCertifications, index, 'name', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Certificate Link/Text</Label><Input value={cert.link} onChange={e => handleDynamicChange(setCertifications, index, 'link', e.target.value)} /></div>
                                </div>
                           ))}
                            <Button variant="outline" onClick={() => handleAddItem(setCertifications, { name: "", link: ""})}><PlusCircle className="mr-2"/>Add Certification</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="activities">
                        <AccordionTrigger>Extra-Curricular Activities</AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/50 rounded-b-lg space-y-4">
                           {activities.map((act, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveItem(setActivities, index)}><Trash2 className="h-4 w-4"/></Button>
                                    <div className="space-y-2"><Label>Activity/Organization Title</Label><Input value={act.title} onChange={e => handleDynamicChange(setActivities, index, 'title', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Your Role (Optional)</Label><Input value={act.role} onChange={e => handleDynamicChange(setActivities, index, 'role', e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Description</Label><Textarea value={act.description} onChange={e => handleDynamicChange(setActivities, index, 'description', e.target.value)} /></div>
                                </div>
                           ))}
                            <Button variant="outline" onClick={() => handleAddItem(setActivities, { title: "", role: "", description: "" })}><PlusCircle className="mr-2"/>Add Activity</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="lg:col-span-1 space-y-8 sticky top-24">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Live Preview</CardTitle>
                                <CardDescription>This is how your resume will look.</CardDescription>
                            </div>
                            <Button className="neon-glow" onClick={handleExportPdf}><Download className="mr-2"/> Export as PDF</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[900px] overflow-auto border rounded-lg shadow-lg">
                            <div ref={resumePreviewRef} className="bg-white p-8 text-gray-800 font-sans text-sm">
                                <header className="text-center mb-8">
                                    <h1 className="text-3xl font-bold font-serif text-black">{details.name}</h1>
                                    <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-2 text-gray-600 flex-wrap">
                                        <span className="flex items-center gap-1.5"><Phone className="h-3 w-3"/>{details.phone}</span>
                                        <a href={`mailto:${details.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="h-3 w-3"/>{details.email}</a>
                                        <a href={`https://${details.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin className="h-3 w-3"/>{details.linkedin}</a>
                                        <a href={`https://${details.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Github className="h-3 w-3"/>{details.github}</a>
                                    </div>
                                </header>
                                
                                <section>
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Summary</h2>
                                    <p className="text-xs leading-relaxed">{summary}</p>
                                </section>

                                <section className="mt-4">
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Education</h2>
                                    {education.map((edu, i) => (
                                        <div key={i} className="mb-2">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="text-sm font-bold">{edu.school}</h3>
                                                <p className="text-xs font-mono text-gray-500">{edu.duration}</p>
                                            </div>
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-xs">{edu.degree}</p>
                                                <p className="text-xs font-mono text-gray-500">{edu.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                <section className="mt-4">
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Projects</h2>
                                    {projects.map((proj, i) => (
                                        <div key={i} className="mb-3">
                                            <h3 className="text-sm font-bold">{proj.title} <span className="font-normal text-xs text-gray-600">| {proj.tech}</span></h3>
                                            <ul className="list-disc list-inside pl-2 mt-1 space-y-0.5">
                                                {proj.description.split('\n').map((line, j) => (
                                                    line.trim() && <li key={j} className="text-xs leading-relaxed">{line}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    <div>
                                        <span className="text-sm font-bold">Other Projects: </span>
                                        <span className="text-xs">{otherProjects}</span>
                                    </div>
                                </section>

                                <section className="mt-4">
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Technical Skills</h2>
                                    {skills.map((skill, i) => (
                                        <p key={i} className="text-xs leading-relaxed">
                                            <span className="font-bold">{skill.category}: </span>{skill.skills}
                                        </p>
                                    ))}
                                </section>

                                 <section className="mt-4">
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Certifications</h2>
                                    {certifications.map((cert, i) => (
                                        <p key={i} className="text-xs leading-relaxed">
                                            <span className="font-bold">{cert.name}: </span>
                                            <a href="#" className="text-blue-600 hover:underline">{cert.link}</a>
                                        </p>
                                    ))}
                                </section>

                                <section className="mt-4">
                                    <h2 className="text-lg font-bold font-serif border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Extra-Curricular Activities</h2>
                                    {activities.map((act, i) => (
                                        <div key={i} className="mb-2">
                                            <h3 className="text-sm font-bold">{act.title} {act.role && <span className="font-normal text-xs text-gray-600">| {act.role}</span>}</h3>
                                             <ul className="list-disc list-inside pl-2 mt-1">
                                                <li className="text-xs leading-relaxed">{act.description}</li>
                                             </ul>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
