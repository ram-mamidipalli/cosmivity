
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Video,
  BrainCircuit,
  FileText,
  BarChart3,
  TrendingUp,
  History,
  Code,
  Users,
  User,
  Case,
} from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const features = [
    {
        icon: <BrainCircuit className="w-8 h-8 text-primary" />,
        title: "AI-Generated Questions",
        description: "Dynamic questions tailored to your resume, job role, and experience level for realistic practice.",
    },
    {
        icon: <Video className="w-8 h-8 text-primary" />,
        title: "Video Recording",
        description: "Record your responses to review body language, confidence, and presentation skills.",
    },
    {
        icon: <FileText className="w-8 h-8 text-primary" />,
        title: "Real-time Transcription",
        description: "Automatic speech-to-text conversion helps analyze your communication patterns and clarity.",
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-primary" />,
        title: "Detailed Analytics",
        description: "Comprehensive scoring on communication, confidence, technical skills, and more.",
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: "Improvement Plans",
        description: "Personalized recommendations and practice plans based on your performance analysis.",
    },
    {
        icon: <History className="w-8 h-8 text-primary" />,
        title: "Progress Tracking",
        description: "Monitor your improvement over time with detailed history and trend analysis.",
    },
];

const interviewTypes = [
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Technical",
        description: "Coding problems, system design, and technical concepts"
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Behavioral",
        description: "Soft skills, teamwork, and situational questions"
    },
    {
        icon: <User className="w-8 h-8 text-primary" />,
        title: "HR Round",
        description: "Background, motivation, and cultural fit assessment"
    },
    {
        icon: <Case className="w-8 h-8 text-primary" />,
        title: "Case Study",
        description: "Problem-solving with real business scenarios"
    }
]

export default function InterviewsPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
        <header className="text-center flex flex-col items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-full w-fit">
                <Video className="w-10 h-10 text-primary" />
            </div>
            <div className="max-w-2xl">
                <h1 className="text-4xl font-bold font-headline">AI-Powered Mock Interview Simulator</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    Practice with realistic interview scenarios, get instant AI feedback, and build confidence for your dream job interviews.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Button size="lg" className="neon-glow">Start Mock Interview</Button>
                <Button size="lg" variant="outline">
                    <History className="mr-2 h-4 w-4" /> View History
                </Button>
            </div>
        </header>

        <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold font-headline">Why Choose Our <span className="text-primary">Interview Simulator?</span></h2>
                <p className="text-muted-foreground mt-3">Our AI-powered platform provides comprehensive interview practice with personalized feedback and improvement suggestions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="glassmorphic p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                {feature.icon}
                            </div>
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold font-headline">Practice Different Interview Types</h2>
                <p className="text-muted-foreground mt-3">Prepare for various interview formats with specialized question sets and evaluation criteria.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {interviewTypes.map((type, index) => (
                    <Card key={index} className="glassmorphic p-4 text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader className="items-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-4">
                                {type.icon}
                            </div>
                            <CardTitle>{type.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{type.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <section className="text-center bg-secondary/50 p-12 rounded-lg">
             <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-headline">Ready to Ace Your Next Interview?</h2>
                <p className="text-muted-foreground mt-3">Join thousands of students who have improved their interview skills with our AI-powered simulator.</p>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button size="lg" className="neon-glow">Start Practicing Now</Button>
                    <Button size="lg" variant="ghost" asChild>
                        <Link href="/dashboard/communication">
                            Try AI Chat First <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
             </div>
        </section>
    </div>
  );
}
