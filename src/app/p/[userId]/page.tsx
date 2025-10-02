
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Phone, Figma, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  contactHeading: "What’s next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect.",
  name: "Sagar"
};

export default function PublicPassportPage() {
    const { toast } = useToast();
    const params = useParams();
    const userId = params.userId as string;
    const [loading, setLoading] = useState(true);

    // States for content
    const [passportData, setPassportData] = useState<any>(null);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const fetchProfile = async () => {
            if (userId) {
                setLoading(true);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('passport_data, user_metadata:id(user_metadata)')
                    .eq('id', userId)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching public profile:', error);
                    setPassportData(defaultData);
                    setUserName(defaultData.name);
                } else if (data) {
                    setPassportData(data.passport_data || defaultData);
                    // Supabase returns an array for the joined table
                    const metadata = Array.isArray(data.user_metadata) ? data.user_metadata[0] : data.user_metadata;
                    setUserName((metadata as any)?.user_metadata?.name || 'User');
                } else {
                    // Handle case where no profile is found
                    setPassportData(defaultData);
                    setUserName('User');
                }
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link Copied!",
            description: "The portfolio link has been copied to your clipboard.",
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${userName}'s Skill Passport`,
                    text: `Check out ${userName}'s professional portfolio on Cosmivity!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    if (loading || !passportData) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

  return (
    <div className="bg-background text-foreground font-body">
        <div className="container mx-auto p-4 md:p-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <h2 className="text-xl font-bold font-code text-primary">{`<${userName}/>`}</h2>
                <div className="flex items-center gap-2">
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
                    <p className="text-5xl md:text-7xl font-bold font-headline h-auto text-center">{passportData.heroTitle}</p>
                    <div className="text-lg text-muted-foreground text-center">{passportData.heroSubtitle}</div>
                    
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <a href={passportData.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                        <a href={passportData.twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                        <a href={passportData.figmaUrl} target="_blank" rel="noopener noreferrer"><Figma className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                    </div>
                </div>
            </section>

            {/* About Me */}
            <section className="py-16">
                <Badge variant="outline" className="mb-4">About</Badge>
                <div className="space-y-4 text-muted-foreground">
                     <h3 className="text-3xl font-bold font-headline text-foreground">Curious about me? Here you have it:</h3>
                     
                     <div className="text-muted-foreground whitespace-pre-line">
                        {passportData.aboutContent.split('\n').map((line:string, i:number) => <p key={i}>{line}</p>)}
                     </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-16 text-center">
                <Badge variant="outline" className="mb-4">Skills</Badge>
                <h3 className="text-2xl text-muted-foreground mb-8">The skills, tools, and technologies I am really good at:</h3>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {passportData.skills.split(',').map((skill:string) => (
                        skill.trim() && <Badge key={skill.trim()} variant="secondary" className="text-lg px-4 py-1">{skill.trim()}</Badge>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="py-16">
                <div className="flex justify-between items-center mb-8">
                    <Badge variant="outline">Experience</Badge>
                </div>
                <h3 className="text-2xl text-muted-foreground mb-8 text-center">Here is a quick summary of my most recent experiences:</h3>
                <div className="space-y-8 max-w-3xl mx-auto">
                    {passportData.experiences.map((exp:any, index:number) => (
                        <Card key={index} className="p-6 relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xl font-bold">{exp.role}</p>
                                    <p className="text-primary font-semibold">{exp.company}</p>
                                </div>
                                <p className="text-muted-foreground text-sm">{exp.duration}</p>
                            </div>
                             { exp.link && exp.link !== '#' && <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{exp.link}</a>}
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                                {exp.description.map((d: string, i: number) => <li key={i}><p className="w-full">{d}</p></li>)}
                            </ul>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="py-16">
                <div className="flex justify-between items-center mb-8">
                    <Badge variant="outline">Work</Badge>
                </div>
                <h3 className="text-2xl text-muted-foreground mb-8 text-center">Some of the noteworthy projects I have built:</h3>
                <div className="space-y-12">
                    {passportData.projects.map((project:any, index:number) => (
                        <Card key={index} className="overflow-hidden relative">
                            <div className="p-8 flex flex-col justify-center">
                                <p className="text-2xl font-bold mb-4">{project.title}</p>
                                <div className="text-muted-foreground mb-4">{project.description}</div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag:string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    {project.liveLink && project.liveLink !== '#' && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-500 hover:underline"><ArrowUpRight className="h-4 w-4"/>Live Demo</a>}
                                    {project.codeLink && project.codeLink !== '#' && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-500 hover:underline"><Github className="h-4 w-4"/>Source Code</a>}
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
                    {passportData.testimonials.map((t:any, index:number) => (
                        <Card key={index} className="p-6">
                            <CardContent className="p-0 flex flex-col items-center text-center">
                                <div className="text-muted-foreground italic mb-4">"{t.quote}"</div>
                                <p className="font-bold text-primary">{t.name}</p>
                                 <p className="text-sm text-muted-foreground">{t.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 text-center">
                <Badge variant="outline" className="mb-4">Get in touch</Badge>
                <div className="text-3xl font-bold font-headline mb-4">{passportData.contactHeading}</div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg mt-8">
                    <div className="flex items-center gap-2">
                        <Mail/>
                        <a href={`mailto:${passportData.email}`} className="hover:text-primary">{passportData.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone/>
                        <a href={`tel:${passportData.phone}`} className="hover:text-primary">{passportData.phone}</a>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 text-muted-foreground mt-8">
                        <a href={passportData.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                        <a href={passportData.twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
                        <a href={passportData.figmaUrl} target="_blank" rel="noopener noreferrer"><Figma className="h-6 w-6 cursor-pointer hover:text-primary"/></a>
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

    