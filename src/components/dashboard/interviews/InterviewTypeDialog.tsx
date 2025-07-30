
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, User, Briefcase, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const interviewTypes = [
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: "HR Round",
    description: "Behavioral and cultural fit questions",
    questions: 5,
    time: "15-20 mins",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Technical Round",
    description: "Role-specific technical questions",
    questions: 7,
    time: "20-30 mins",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Behavioral Round",
    description: "Situational and competency-based questions",
    questions: 6,
    time: "15-25 mins",
  },
];

export default function InterviewTypeDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleStartInterview = () => {
    router.push('/dashboard/interviews/setup');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glassmorphic sm:max-w-4xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-headline text-center">Mock Interview</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Practice with our AI interviewer to ace your next interview
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {interviewTypes.map((type, index) => (
                <Card key={index} className="bg-background/50 p-6 flex flex-col text-center items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                        {type.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline">{type.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-grow">{type.description}</p>
                    <div className="flex justify-between w-full text-sm text-muted-foreground mt-6">
                        <span>{type.questions} questions</span>
                        <span>{type.time}</span>
                    </div>
                    <Button className="w-full mt-4 neon-glow" onClick={handleStartInterview}>Start Interview</Button>
                </Card>
            ))}
        </div>
        <div className="mt-8">
            <h3 className="text-xl font-bold font-headline mb-4 text-center">Interview Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                    <h4 className="font-semibold mb-2">Before the Interview</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Research the company and role thoroughly</li>
                        <li>Prepare specific examples using the STAR method</li>
                        <li>Practice common questions out loud</li>
                        <li>Test your camera and microphone</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">During the Interview</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Maintain eye contact with the camera</li>
                        <li>Speak clearly and at a moderate pace</li>
                        <li>Use specific examples and quantify results</li>
                        <li>Ask thoughtful questions about the role</li>
                    </ul>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
