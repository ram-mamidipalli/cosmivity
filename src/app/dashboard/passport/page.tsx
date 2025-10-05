
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Phone, Dribbble, Figma, Edit, Copy, Upload, Trash2, Save, PlusCircle, Share2, Download } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import html2canvas from "html2canvas";

const EditableField = ({ isEditing, value, onChange, isTextarea = false, className = '', rows = 3, placeholder = "" }: any) => {
    if (isEditing) {
        return isTextarea ? (
            <Textarea value={value} onChange={(e) => onChange(e.target.value)} className={`w-full ${className}`} rows={rows} placeholder={placeholder} />
        ) : (
            <Input value={value} onChange={(e) => onChange(e.target.value)} className={`w-full ${className}`} placeholder={placeholder} />
        );
    }
    if (isTextarea) {
        return <div className={className}>{value.split('\n').map((line:string, i:number) => <p key={i}>{line}</p>)}</div>;
    }
    return <p className={className}>{value}</p>;
};

const initialExperiences = [
    {
        company: "Upwork",
        role: "Sr. Frontend Developer",
        duration: "Nov 2021 - Present",
        link: "https://www.upwork.com/",
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
        link: "#",
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
        liveLink: "#",
        codeLink: "#"
    },
    {
        title: "Project Two",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tags: ["TypeScript", "Node.js", "MongoDB"],
        liveLink: "#",
        codeLink: "#"
    }
]

const initialTestimonials = [
    {
        name: "Client One",
        title: "CEO, Company A",
        quote: "Sagar is a very talented developer. He delivered a high-quality product on time and was a pleasure to work with."
    },
    {
        name: "Client Two",
        title: "CTO, Company B",
        quote: "Excellent communication and technical skills. Sagar was instrumental in the success of our project."
    },
     {
        name: "Client Three",
        title: "Lead Designer, Company C",
        quote: "A true professional who understands design and user experience. Highly recommended."
    }
]

const defaultData = {
  heroTitle: "Hi, I'm Sagar 👋",
  heroSubtitle: "I'm a full-stack developer with 5+ years of experience. I enjoy building solid and scalable frontend products with great user experiences.",
  aboutContent: `I'm a passionate and self-proclaimed designer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matters to me.

I began my journey as a web developer in 2015, and since then, I've continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, in my early thirties, 5 years after starting my web development journey, I'm building cutting-edge web applications using modern technologies such as Next.js, TypeScript, Nestjs, Tailwindcss, Supabase and much more.

I am very much a person who loves to solve problems of others and loves to help people with their questions. I am also a great team player and always willing to learn from others.

Finally, some quick bits about me.
- B.E. in Computer Engineering
- Full time freelancer
- Avid learner
- Basketball fan

One last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I don't bite 😉`,
  skills: "JavaScript,TypeScript,React,Next.js,Node.js,Figma,Firebase,MongoDB,Tailwind CSS,figma,wordpress",
  experiences: initialExperiences,
  projects: initialProjects,
  testimonials: initialTestimonials,
  githubUrl: "https://github.com/sagar-dev",
  twitterUrl: "https://twitter.com/sagar_dev",
  figmaUrl: "https://figma.com/@sagar-dev",
  email: "sagar@example.com",
  phone: "+91 98765 43210",
  contactHeading: "What’s next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect."
};

export default function PassportPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  // States for editable content
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactHeading, setContactHeading] = useState("");

  const loadProfileData = useCallback((profileData: any) => {
    setHeroTitle(profileData.heroTitle || defaultData.heroTitle);
    setHeroSubtitle(profileData.heroSubtitle || defaultData.heroSubtitle);
    setAboutContent(profileData.aboutContent || defaultData.aboutContent);
    setSkills(profileData.skills || defaultData.skills);
    setExperiences(profileData.experiences || defaultData.experiences);
    setProjects(profileData.projects || defaultData.projects);
    setTestimonials(profileData.testimonials || defaultData.testimonials);
    setGithubUrl(profileData.githubUrl || defaultData.githubUrl);
    setTwitterUrl(profileData.twitterUrl || defaultData.twitterUrl);
    setFigmaUrl(profileData.figmaUrl || defaultData.figmaUrl);
    setEmail(profileData.email || defaultData.email);
    setPhone(profileData.phone || defaultData.phone);
    setContactHeading(profileData.contactHeading || defaultData.contactHeading);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
        if (user) {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('passport_data')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116: row not found
                console.error('Error fetching profile:', error);
                toast({ title: "Error", description: "Could not fetch your profile data.", variant: "destructive" });
                loadProfileData(defaultData);
            } else {
                loadProfileData(data?.passport_data || defaultData);
            }
            
            setLoading(false);
        }
    };
    fetchProfile();
  }, [user, toast, loadProfileData]);


  const publicProfileUrl = user ? `${window.location.origin}/p/${user.id}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicProfileUrl);
    toast({
      title: "Link Copied!",
      description: "Your public Skill Passport link has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    const input = portfolioRef.current;
    if (input) {
      toast({ title: "Generating PNG...", description: "Please wait a moment." });
      html2canvas(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0A0A0A' : '#FFFFFF',
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      }).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        const fileName = `${(user?.user_metadata.name || 'user').toLowerCase().replace(" ", "-")}-portfolio.png`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Portfolio Downloaded!",
          description: `Your portfolio has been saved as ${fileName}.`,
        });
      }).catch(err => {
        console.error("Could not generate file", err);
        toast({
          title: "Download Failed",
          description: "There was an error generating the PNG file.",
          variant: "destructive"
        })
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Skill Passport",
          text: "Check out my professional portfolio on Cosmivity!",
          url: publicProfileUrl,
        });
        toast({
          title: "Portfolio Shared!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSave = async () => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to save.", variant: "destructive" });
        return;
    }
    setIsEditing(false);
    const passport_data = {
        heroTitle, heroSubtitle, aboutContent, skills, experiences, projects, testimonials,
        githubUrl, twitterUrl, figmaUrl, email, phone, contactHeading
    };

     const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, passport_data, updated_at: new Date().toISOString() }, { onConflict: 'id' })
      .select()


    if (error) {
        console.error("Error saving profile:", error);
        toast({
            title: "Save Failed",
            description: "There was an error saving your portfolio.",
            variant: "destructive"
        });
    } else {
        toast({
            title: "Profile Saved!",
            description: "Your changes have been saved successfully.",
        });
    }
  }
  
  const handleExperienceChange = useCallback((index: number, field: string, value: string, descIndex?: number) => {
    setExperiences(prev => {
        const newExps = [...prev];
        const experienceToUpdate = { ...newExps[index] };
        if (field === 'description' && descIndex !== undefined) {
            const newDesc = [...experienceToUpdate.description];
            newDesc[descIndex] = value;
            experienceToUpdate.description = newDesc;
        } else {
            (experienceToUpdate as any)[field] = value;
        }
        newExps[index] = experienceToUpdate;
        return newExps;
    });
  }, []);

  const handleAddExperience = () => {
      setExperiences(prev => [...prev, { company: "New Company", role: "New Role", duration: "Present", link: "#", description: ["Description point 1."] }]);
  }

  const handleRemoveExperience = (index: number) => {
      setExperiences(prev => prev.filter((_, i) => i !== index));
  }

  const handleProjectChange = useCallback((index: number, field: string, value: any) => {
      setProjects(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  }, []);

  const handleAddProject = () => {
      setProjects(prev => [...prev, { title: "New Project", description: "A brief description of your new project.", tags: ["New Tag"], liveLink: "#", codeLink: "#" }]);
  }

  const handleRemoveProject = (index: number) => {
      setProjects(prev => prev.filter((_, i) => i !== index));
  }

  const handleTestimonialChange = useCallback((index: number, field: string, value: string) => {
      setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  }, []);

  const handleHeroTitleChange = useCallback((value: string) => setHeroTitle(value), []);
  const handleHeroSubtitleChange = useCallback((value: string) => setHeroSubtitle(value), []);
  const handleAboutContentChange = useCallback((value: string) => setAboutContent(value), []);
  const handleSkillsChange = useCallback((value: string) => setSkills(value), []);
  const handleGithubUrlChange = useCallback((value: string) => setGithubUrl(value), []);
  const handleTwitterUrlChange = useCallback((value: string) => setTwitterUrl(value), []);
  const handleFigmaUrlChange = useCallback((value: string) => setFigmaUrl(value), []);
  const handleEmailChange = useCallback((value: string) => setEmail(value), []);
  const handlePhoneChange = useCallback((value: string) => setPhone(value), []);
  const handleContactHeadingChange = useCallback((value: string) => setContactHeading(value), []);

  if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading profile...</div>
  }

  return (
    <div ref={portfolioRef}>
        <div className="bg-background text-foreground font-body">
            <div className="container mx-auto p-4 md:p-8 animate-in fade-in duration-500">
                {/* Header */}
                <header className="flex justify-between items-center py-4">
                    <h2 className="text-xl font-bold font-code text-primary">{`<${user?.user_metadata.name || 'Sagar'}/>`}</h2>
                    <div className="flex items-center gap-2">
                        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                            {isEditing ? 'Save Profile' : 'Edit Profile'}
                        </Button>
                         <Button variant="outline" size="icon" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
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
                        <EditableField isEditing={isEditing} value={heroTitle} onChange={handleHeroTitleChange} className="text-5xl md:text-7xl font-bold font-headline h-auto text-center" />
                        <EditableField isEditing={isEditing} value={heroSubtitle} onChange={handleHeroSubtitleChange} isTextarea={true} className="text-lg text-muted-foreground text-center" rows={4}/>
                        
                        <div className="flex items-center justify-center gap-4 text-muted-foreground">
                            {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
                                    <Input value={githubUrl} onChange={e => handleGithubUrlChange(e.target.value)} placeholder="GitHub URL" />
                                    <Input value={twitterUrl} onChange={e => handleTwitterUrlChange(e.target.value)} placeholder="Twitter URL" />
                                    <Input value={figmaUrl} onChange={e => handleFigmaUrlChange(e.target.value)} placeholder="Figma URL" />
                                </div>
                            ) : (
                                <>
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                                    <a href={figmaUrl} target="_blank" rel="noopener noreferrer"><Figma className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* About Me */}
                <section className="py-16">
                    <Badge variant="outline" className="mb-4">About</Badge>
                    <div className="space-y-4 text-muted-foreground">
                         <h3 className="text-3xl font-bold font-headline text-foreground">Curious about me? Here you have it:</h3>
                         
                         <EditableField
                            isEditing={isEditing}
                            value={aboutContent}
                            onChange={handleAboutContentChange}
                            isTextarea={true}
                            className="text-muted-foreground whitespace-pre-line"
                            rows={15}
                          />
                    </div>
                </section>

                {/* Skills */}
                <section className="py-16 text-center">
                    <Badge variant="outline" className="mb-4">Skills</Badge>
                    <h3 className="text-2xl text-muted-foreground mb-8">The skills, tools, and technologies I am really good at:</h3>
                    {isEditing ? (
                        <div className="max-w-2xl mx-auto">
                            <Label htmlFor="skills-input">Enter skills separated by commas</Label>
                            <Input 
                                id="skills-input"
                                value={skills} 
                                onChange={(e) => handleSkillsChange(e.target.value)}
                                placeholder="e.g., React, Next.js, Figma"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            {skills.split(',').map(skill => (
                                skill.trim() && <Badge key={skill.trim()} variant="secondary" className="text-lg px-4 py-1">{skill.trim()}</Badge>
                            ))}
                        </div>
                    )}
                </section>

                {/* Experience */}
                <section className="py-16">
                    <div className="flex justify-between items-center mb-8">
                        <Badge variant="outline">Experience</Badge>
                        {isEditing && (
                            <Button variant="outline" onClick={handleAddExperience}><PlusCircle className="mr-2 h-4 w-4"/>Add Experience</Button>
                        )}
                    </div>
                    <h3 className="text-2xl text-muted-foreground mb-8 text-center">Here is a quick summary of my most recent experiences:</h3>
                    <div className="space-y-8 max-w-3xl mx-auto">
                        {experiences.map((exp, index) => (
                            <Card key={index} className="p-6 relative">
                                {isEditing && <Button variant="destructive" size="icon" className="absolute top-4 right-4 h-7 w-7" onClick={() => handleRemoveExperience(index)}><Trash2 className="h-4 w-4"/></Button>}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <EditableField isEditing={isEditing} value={exp.role} onChange={(newValue: string) => handleExperienceChange(index, 'role', newValue)} className="text-xl font-bold"/>
                                        <EditableField isEditing={isEditing} value={exp.company} onChange={(newValue: string) => handleExperienceChange(index, 'company', newValue)} className="text-primary font-semibold"/>
                                    </div>
                                    <EditableField isEditing={isEditing} value={exp.duration} onChange={(newValue: string) => handleExperienceChange(index, 'duration', newValue)} className="text-muted-foreground text-sm"/>
                                </div>
                                 <EditableField isEditing={isEditing} value={exp.link} onChange={(newValue: string) => handleExperienceChange(index, 'link', newValue)} className="text-sm text-blue-500 hover:underline" placeholder="Link to project/company"/>

                                <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                                    {exp.description.map((d: string, i: number) => <li key={i}><EditableField isEditing={isEditing} value={d} onChange={(newValue: string) => handleExperienceChange(index, 'description', newValue, i)} isTextarea={true} className="w-full" /></li>)}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="py-16">
                    <div className="flex justify-between items-center mb-8">
                        <Badge variant="outline">Work</Badge>
                         {isEditing && (
                            <Button variant="outline" onClick={handleAddProject}><PlusCircle className="mr-2 h-4 w-4"/>Add Project</Button>
                        )}
                    </div>
                    <h3 className="text-2xl text-muted-foreground mb-8 text-center">Some of the noteworthy projects I have built:</h3>
                    <div className="space-y-12">
                        {projects.map((project, index) => (
                            <Card key={index} className="overflow-hidden relative">
                                 {isEditing && <Button variant="destructive" size="icon" className="absolute top-4 right-4 h-7 w-7 z-10" onClick={() => handleRemoveProject(index)}><Trash2 className="h-4 w-4"/></Button>}
                                <div className="p-8 flex flex-col justify-center">
                                    <EditableField isEditing={isEditing} value={project.title} onChange={(newValue: string) => handleProjectChange(index, 'title', newValue)} className="text-2xl font-bold mb-4"/>
                                    <EditableField isEditing={isEditing} value={project.description} onChange={(newValue: string) => handleProjectChange(index, 'description', newValue)} isTextarea={true} className="text-muted-foreground mb-4"/>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {isEditing ? 
                                            <Input value={project.tags.join(', ')} onChange={(e) => handleProjectChange(index, 'tags', e.target.value.split(',').map(s => s.trim()))} placeholder="Comma-separated tags" />
                                            :
                                            project.tags.map((tag:string) => <Badge key={tag} variant="secondary">{tag}</Badge>)
                                        }
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        {isEditing ? (
                                            <>
                                                <Input value={project.liveLink} onChange={(e) => handleProjectChange(index, 'liveLink', e.target.value)} placeholder="Live URL"/>
                                                <Input value={project.codeLink} onChange={(e) => handleProjectChange(index, 'codeLink', e.target.value)} placeholder="Code URL"/>
                                            </>
                                        ) : (
                                            <>
                                                {project.liveLink && project.liveLink !== '#' && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-500 hover:underline"><ArrowUpRight className="h-4 w-4"/>Live Demo</a>}
                                                {project.codeLink && project.codeLink !== '#' && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-500 hover:underline"><Github className="h-4 w-4"/>Source Code</a>}
                                            </>
                                        )}
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
                            <Card key={index} className="p-6">
                                <CardContent className="p-0 flex flex-col items-center text-center">
                                    <EditableField 
                                        isEditing={isEditing}
                                        value={`"${t.quote}"`}
                                        onChange={(newValue: string) => handleTestimonialChange(index, 'quote', newValue.replace(/"/g, ''))}
                                        isTextarea={true}
                                        className="text-muted-foreground italic mb-4"
                                    />
                                    <EditableField 
                                        isEditing={isEditing}
                                        value={t.name}
                                        onChange={(newValue: string) => handleTestimonialChange(index, 'name', newValue)}
                                        className="font-bold text-primary"
                                    />
                                     <EditableField 
                                        isEditing={isEditing}
                                        value={t.title}
                                        onChange={(newValue: string) => handleTestimonialChange(index, 'title', newValue)}
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
                    <EditableField 
                        isEditing={isEditing}
                        value={contactHeading}
                        onChange={handleContactHeadingChange}
                        isTextarea={true}
                        className="text-3xl font-bold font-headline mb-4"
                        rows={3}
                    />
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg mt-8">
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
                                <Input value={email} onChange={e => handleEmailChange(e.target.value)} placeholder="Email Address" />
                                <Input value={phone} onChange={e => handlePhoneChange(e.target.value)} placeholder="Phone Number" />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    <Mail/>
                                    <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone/>
                                    <a href={`tel:${phone}`} className="hover:text-primary">{phone}</a>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-4 text-muted-foreground mt-8">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                            <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                            <a href={figmaUrl} target="_blank" rel="noopener noreferrer"><Figma className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                        </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-sm text-muted-foreground py-8">
                    <p>Powered by Cosmivity</p>
                </footer>
            </div>
        </div>
    </div>
  );
}
