"use client";

import { BrainCircuit, Briefcase, MessageSquare, FileX2, Clock, PenSquare } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const painPoints = [
  { text: "Weak Aptitude & Reasoning", icon: <BrainCircuit className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
  { text: "Nervous in Interviews", icon: <Briefcase className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
  { text: "Poor Spoken English", icon: <MessageSquare className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
  { text: "Resume Not Shortlisted", icon: <FileX2 className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
  { text: "No Structured Practice", icon: <Clock className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
  { text: "Generic Feedback", icon: <PenSquare className="w-6 h-6 text-primary mr-3 flex-shrink-0" /> },
];

export default function Problem() {
  const [ref, isInView] = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="problem" className="py-20 bg-secondary/50 text-foreground">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 ease-in-out",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            You've got the degree. Now, get the confidence.
          </h2>
          <p className="text-lg text-muted-foreground">Is something holding you back from landing your dream job?</p>
        </div>
        <div className="flex flex-col items-center gap-12">
          <div className="max-w-5xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-center text-center justify-center text-lg p-3 rounded-lg h-full border bg-card text-card-foreground shadow-sm">
                  {point.icon}
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
