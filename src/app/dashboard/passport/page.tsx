
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Phone, Dribbble, Figma, Edit, Copy, Upload, Trash2, Save, PlusCircle, Share2 } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialSkills = [
    { name: "JavaScript", icon: "https://placehold.co/48x48.png", hint: "javascript logo" },
    { name: "TypeScript", icon: "https://placehold.co/48x48.png", hint: "typescript logo" },
    { name: "React", icon: "https://placehold.co/48x48.png", hint: "react logo" },
    { name: "Next.js", icon: "https://placehold.co/48x48.png", hint: "nextjs logo" },
    { name: "Node.js", icon: "https://placehold.co/48x48.png", hint: "nodejs logo" },
    { name: "Figma", icon: "https://placehold.co/48x48.png", hint: "figma logo" },
    { name: "Firebase", icon: "https://placehold.co/48x48.png", hint: "firebase logo" },
    { name: "MongoDB", icon: "https://placehold.co/48x48.png", hint: "mongodb logo" },
    { name: "Tailwind CSS", icon: "https://placehold.co/48x48.png", hint: "tailwind css logo" },
];

const initialExperiences = [
    {
        company: "Upwork",
        role: "Sr. Frontend Developer",
        duration: "Nov 2021 - Present",
        description: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        ]
    },
    {
        company: "Company Two",
        role: "Team Lead",
        duration: "Jan 2018 - Oct 2021",
        description: [
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        ]
    }
]

const initialProjects = [
    {
        title: "Project One",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["React", "Next.js", "Tailwind CSS", "Figma", "Firebase"],
        image: "https://placehold.co/600x400.png",
        hint: "website screenshot",
        liveLink: "#",
        codeLink: "#"
    },
    {
        title: "Project Two",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tags: ["TypeScript", "Node.js", "MongoDB"],
        image: "https://placehold.co/600x400.png",
        hint: "dashboard interface",
        liveLink: "#",
        codeLink: "#"
    }
]

const initialTestimonials = [
    {
        name: "Client One",
        title: "CEO, Company A",
        quote: "Sagar is a very talented developer. He delivered a high-quality product on time and was a pleasure to work with.",
        avatar: "https://placehold.co/80x80.png",
        hint: "man portrait"
    },
    {
        name: "Client Two",
        title: "CTO, Company B",
        quote: "Excellent communication and technical skills. Sagar was instrumental in the success of our project.",
        avatar: "https://placehold.co/80x80.png",
        hint: "woman portrait"
    },
     {
        name: "Client Three",
        title: "Lead Designer, Company C",
        quote: "A true professional who understands design and user experience. Highly recommended.",
        avatar: "https://placehold.co/80x80.png",
        hint: "person smiling"
    }
]

export default function PassportPage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // States for editable content
  const [heroTitle, setHeroTitle] = useState("Hi, I'm Sagar 👋");
  const [heroSubtitle, setHeroSubtitle] = useState("I'm a full-stack developer with 5+ years of experience. I enjoy building solid and scalable frontend products with great user experiences.");
  const [aboutTitle, setAboutTitle] = useState("Curious about me? Here you have it:");
  const [aboutContent, setAboutContent] = useState([
    "I'm a passionate and self-proclaimed designer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matters to me.",
    "I began my journey as a web developer in 2015, and since then, I've continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, in my early thirties, 5 years after starting my web development journey, I'm building cutting-edge web applications using modern technologies such as Next.js, TypeScript, Nestjs, Tailwindcss, Supabase and much more.",
    "I am very much a person who loves to solve problems of others and loves to help people with their questions. I am also a great team player and always willing to learn from others.",
    "Finally, some quick bits about me.",
    "One last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I don't bite 😉"
  ]);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [projects, setProjects] = useState(initialProjects);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Your Skill Passport link has been copied to your clipboard.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Skill Passport",
          text: "Check out my professional portfolio on Cosmivity!",
          url: window.location.href,
        });
        toast({
          title: "Portfolio Shared!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to copy link if sharing fails
        handleCopyLink();
      }
    } else {
      // Fallback for browsers that don't support the Share API
      handleCopyLink();
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
        title: "Profile Saved!",
        description: "Your changes have been saved locally.",
    });
  }

  const EditableField = ({ value, onChange, isTextarea = false, className = '' }: any) => {
    if (isEditing) {
        return isTextarea ? (
            <Textarea value={value} onChange={(e) => onChange(e.target.value)} className={`w-full ${className}`} />
        ) : (
            <Input value={value} onChange={(e) => onChange(e.target.value)} className={`w-full ${className}`} />
        );
    }
    // For multiline text from textarea, we need to render newlines
    if (isTextarea) {
        return <p className={className}>{value.split('\n').map((line:string, i:number) => <span key={i}>{line}<br/></span>)}</p>;
    }
    return <p className={className}>{value}</p>;
  };
  
  const EditableImage = ({ src, alt, hint, children }: any) => {
    return (
        <div className="relative group">
            {children}
            {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4"/>Change</Button>
                </div>
            )}
        </div>
    )
  }

  return (
    <div className="bg-background text-foreground font-body">
        <div className="container mx-auto p-4 md:p-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <h2 className="text-xl font-bold font-code text-primary">{"<Sagar/>"}</h2>
                <div className="flex items-center gap-2">
                    <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                        {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                        {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 md:py-24 text-center">
                <div className="space-y-6 max-w-3xl mx-auto">
                    {isEditing ? <Input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="text-5xl md:text-7xl font-bold font-headline h-auto text-center" /> : <h1 className="text-5xl md:text-7xl font-bold font-headline">{heroTitle}</h1>}
                    {isEditing ? <Textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} className="text-lg text-muted-foreground text-center" rows={4}/> : <p className="text-lg text-muted-foreground">{heroSubtitle}</p>}
                    
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <Github className="h-6 w-6 cursor-pointer hover:text-primary"/>
                        <Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/>
                        <Figma className="h-6 w-6 cursor-pointer hover:text-primary"/>
                    </div>
                </div>
            </section>

            {/* About Me */}
            <section className="py-16">
                <Badge variant="outline" className="mb-4">About</Badge>
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1">
                        <EditableImage src="https://placehold.co/400x600.png" alt="Sagar walking in a park" hint="man walking">
                            <Image src="https://placehold.co/400x600.png" width={400} height={600} alt="Sagar walking in a park" className="rounded-lg shadow-md" data-ai-hint="man walking"/>
                        </EditableImage>
                    </div>
                    <div className="md:col-span-2 space-y-4 text-muted-foreground">
                         {isEditing ? <Input value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} className="text-3xl font-bold font-headline text-foreground h-auto" /> : <h3 className="text-3xl font-bold font-headline text-foreground">{aboutTitle}</h3>}
                         {aboutContent.map((paragraph, index) => (
                            <EditableField key={index} value={paragraph} onChange={(newValue: string) => {
                                const newContent = [...aboutContent];
                                newContent[index] = newValue;
                                setAboutContent(newContent);
                            }} isTextarea={true} />
                        ))}

                        <div className="flex gap-8">
                            <ul className="list-disc list-inside">
                                <li>B.E. in Computer Engineering</li>
                                <li>Full time freelancer</li>
                            </ul>
                            <ul className="list-disc list-inside">
                                <li>Avid learner</li>
                                <li>Basketball fan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-16 text-center">
                <Badge variant="outline" className="mb-4">Skills</Badge>
                <h3 className="text-2xl text-muted-foreground mb-8">The skills, tools, and technologies I am really good at:</h3>
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {initialSkills.map(skill => (
                        <div key={skill.name} className="flex flex-col items-center gap-2">
                            <Image src={skill.icon} alt={skill.name} width={48} height={48} data-ai-hint={skill.hint}/>
                            <span className="text-sm">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="py-16">
                <Badge variant="outline" className="mb-4">Experience</Badge>
                <h3 className="text-2xl text-muted-foreground mb-8 text-center">Here is a quick summary of my most recent experiences:</h3>
                <div className="space-y-8 max-w-3xl mx-auto">
                    {experiences.map((exp, index) => (
                        <Card key={exp.company} className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <EditableField value={exp.role} onChange={(newValue: string) => setExperiences(exps => exps.map((e, i) => i === index ? {...e, role: newValue} : e))} className="text-xl font-bold"/>
                                    <EditableField value={exp.company} onChange={(newValue: string) => setExperiences(exps => exps.map((e, i) => i === index ? {...e, company: newValue} : e))} className="text-primary font-semibold"/>
                                </div>
                                <EditableField value={exp.duration} onChange={(newValue: string) => setExperiences(exps => exps.map((e, i) => i === index ? {...e, duration: newValue} : e))} className="text-muted-foreground text-sm"/>
                            </div>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                {exp.description.map((d, i) => <EditableField key={i} value={d} onChange={(newValue: string) => {
                                    const newExps = [...experiences];
                                    newExps[index].description[i] = newValue;
                                    setExperiences(newExps);
                                }}/>)}
                            </ul>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="py-16">
                <Badge variant="outline" className="mb-4">Work</Badge>
                <h3 className="text-2xl text-muted-foreground mb-8 text-center">Some of the noteworthy projects I have built:</h3>
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <Card key={project.title} className="grid md:grid-cols-2 overflow-hidden">
                            <div className={`p-8 bg-card ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                                <EditableImage src={project.image} alt={project.title} hint={project.hint}>
                                    <Image src={project.image} alt={project.title} width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint={project.hint}/>
                                </EditableImage>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <EditableField value={project.title} onChange={(newValue: string) => setProjects(projs => projs.map((p, i) => i === index ? {...p, title: newValue} : p))} className="text-2xl font-bold mb-4"/>
                                <EditableField value={project.description} onChange={(newValue: string) => setProjects(projs => projs.map((p, i) => i === index ? {...p, description: newValue} : p))} isTextarea={true} className="text-muted-foreground mb-4"/>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="icon"><ArrowUpRight/></Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <Badge variant="outline" className="mb-4">Testimonials</Badge>
                <h3 className="text-2xl text-muted-foreground mb-8 text-center">Nice things people have said about me:</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <Card key={t.name} className="p-6">
                            <CardContent className="p-0 flex flex-col items-center text-center">
                                <EditableImage src={t.avatar} alt={t.name} hint={t.hint}>
                                    <Avatar className="w-20 h-20 mb-4">
                                        <AvatarImage src={t.avatar} alt={t.name} data-ai-hint={t.hint}/>
                                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                                    </Avatar>
                                </EditableImage>
                                <EditableField 
                                    value={`"${t.quote}"`}
                                    onChange={(newValue: string) => setTestimonials(prev => prev.map((item, i) => i === index ? { ...item, quote: newValue.replace(/"/g, '') } : item))}
                                    isTextarea={true}
                                    className="text-muted-foreground italic mb-4"
                                />
                                <EditableField 
                                    value={t.name}
                                    onChange={(newValue: string) => setTestimonials(prev => prev.map((item, i) => i === index ? { ...item, name: newValue } : item))}
                                    className="font-bold text-primary"
                                />
                                 <EditableField 
                                    value={t.title}
                                    onChange={(newValue: string) => setTestimonials(prev => prev.map((item, i) => i === index ? { ...item, title: newValue } : item))}
                                    className="text-sm text-muted-foreground"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 text-center">
                <Badge variant="outline" className="mb-4">Get in touch</Badge>
                <h3 className="text-3xl font-bold font-headline mb-4">What’s next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect.</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg mt-8">
                    <div className="flex items-center gap-2">
                        <Mail/>
                        <a href="mailto:sagar@example.com" className="hover:text-primary">sagar@example.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone/>
                        <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 text-muted-foreground mt-8">
                        <Github className="h-6 w-6 cursor-pointer hover:text-primary"/>
                        <Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/>
                        <Figma className="h-6 w-6 cursor-pointer hover:text-primary"/>
                    </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground py-8">
                <p>Powered by Cosmivity</p>
            </footer>
        </div>
    </div>
  );
}

    

    