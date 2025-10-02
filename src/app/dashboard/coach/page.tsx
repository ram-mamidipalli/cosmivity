
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

const initialDetails = {
    name: "M S Aditya Vardhan",
    phone: "+91-9392584546",
    email: "msadityavardhan18@gmail.com",
    linkedin: "linkedin.com/in/msadityavardhan",
    github: "github.com/msadityavardhan"
};

const initialSummary = "Enthusiastic graduate seeking to start a career as an entry-level engineer with a reputed firm driven by technology. Passionate about implementing and launching new projects. Strong collaborative skills gained through team projects and a proactive approach to learning. Excited to contribute innovative solutions and learn from experienced professionals in a dynamic environment.";

const initialEducation = [
    { school: "Vellore Institute of Technology", degree: "BTech in Computer Science and Engineering (GPA: 8.02/10)", duration: "2021 - Present", location: "Amaravathi, Andhra Pradesh" },
    { school: "Aditya Junior College", degree: "Intermediate (GPA: 9.80/10)", duration: "2019 - 2021", location: "Andhra Pradesh" },
    { school: "Narayana Institutions", degree: "Schooling (GPA: 10/10)", duration: "2018 - 2019", location: "Andhra Pradesh" }
];

const initialProjects = [
    { title: "Autism Disorder Detection", tech: "Python, Convolutional Neural Networks, ResNet, VGG16, Deep Learning", description: "Developed a deep learning-based system to detect autistic traits from image datasets, focusing on early and accurate diagnosis. Preprocessed images using techniques such as normalization, data augmentation, and feature scaling, ensuring high-quality inputs to the model.\nIncorporated advanced architectures like ResNet and VGG16 for improved accuracy and robustness.\nExtracted critical features like facial landmarks, eye gaze patterns, and micro-expressions to identify potential indicators of autism. Integrated transfer learning for faster training and better generalization on smaller datasets." },
    { title: "Rice Plant Disease Detection", tech: "Python, Deep Learning, Convolutional Neural Networks", description: "Developed a Convolutional Neural Network (CNN) model with 2D convolution, Max Pooling, and Softmax output layers to classify rice leaf disease images. Preprocessed images using data augmentation and normalization to enhance model performance.\nTrained the model for 70 epochs, implementing callbacks to halt training upon reaching the desired accuracy.\nAchieved a 95% accuracy on a standard rice leaf disease dataset." },
    { title: "Gaming Community", tech: "ReactJs, NodeJs, MongoDB", description: "Developed a full-stack web application providing a platform for gamers to connect, share content, and communicate. Built a secure backend using Node.js and MongoDB, implementing user authentication and session management with JWT for data protection.\nDesigned and implemented search and filtering functionalities to allow users to find game-specific groups and posts quickly. Integrated real-time messaging to allow users to interact and communicate within the platform." }
];

const initialOtherProjects = "Customer churn prediction, Smart Farming Assistant, Smart Farming using Solar Power, Facial Emotion Detection.";

const initialSkills = [
    { category: "Technical Skills", skills: "Machine Learning, Natural Language Processing, Deep Learning, OOPS, Artificial Intelligence" },
    { category: "Programming Languages", skills: "Java, HTML, CSS, Python, ReactJs, NodeJs" },
    { category: "Tools", skills: "NLTK, Numpy, scikit-learn, PyTorch, TensorFlow, OpenCV, PowerBI" },
    { category: "Database", skills: "SQL, MongoDB" },
    { category: "Soft Skills", skills: "Leadership, Teamwork, Communication, Time management, Problem Solving, Analytical Thinking" },
];

const initialCertifications = [
    { name: "AWS Cloud Practioner", link: "AWS Certificate" },
    { name: "MERN Full Stack Web Development", link: "MERN Certificate" },
    { name: "Google Analytics for Beginners", link: "certificate" },
];

const initialActivities = [
    { title: "NextGen Cloud Tech Club", role: "Technical Team Member", description: "Worked as a technical team member in the NextGen Cloud tech club for 6 months" },
    { title: "IEI[Institution of Engineers) Chapter", role: "Technical Co-Lead", description: "We are the forming team members of the IEI chapter in our college" },
    { title: "Research Paper", role: "", description: "Applied to present my research paper at the ICISML conference on meeting summarization using natural language processing." },
    { title: "Community Volunteer", role: "", description: "Participated in organizing and managing various events during the college fest. Responsibilities included coordinating with different teams and ensuring smooth execution of activities. Developed strong organizational skills." }
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
        const JSPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        html2canvas(resumePreviewRef.current, { scale: 2, useCORS: true, windowWidth: resumePreviewRef.current.scrollWidth, windowHeight: resumePreviewRef.current.scrollHeight  }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JSPDF('p', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${details.name.toLowerCase().replace(" ", "-")}-resume.pdf`);
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
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>This is how your resume will look.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[800px] overflow-auto border rounded-lg shadow-lg">
                            <div ref={resumePreviewRef} className="bg-white p-8 text-gray-800 font-sans text-sm">
                                <header className="text-center mb-8">
                                    <h1 className="text-4xl font-bold font-serif text-black">{details.name}</h1>
                                    <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-2 text-gray-600 flex-wrap">
                                        <span className="flex items-center gap-1.5"><Phone className="h-3 w-3"/>{details.phone}</span>
                                        <span className="flex items-center gap-1.5"><Mail className="h-3 w-3"/>{details.email}</span>
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


    