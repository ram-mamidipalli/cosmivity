
"use client";

import { XCircle } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const painPoints = [
  "Weak aptitude & reasoning",
  "Nervous in interviews",
  "Poor spoken English",
  "No structured practice",
  "Generic feedback",
  "Resume not shortlisted",
];

export default function Problem() {
  const [ref, isInView] = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="problem" className="py-20 bg-secondary/50">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 ease-in-out",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            You’ve got the degree. But not the confidence.
          </h2>
        </div>
        <div className="flex flex-col items-center gap-12">
          <div className="max-w-5xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-center text-center justify-center text-lg p-3 rounded-lg h-full border bg-card text-card-foreground shadow-sm">
                  <XCircle className="w-6 h-6 text-destructive mr-3 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-lg max-w-2xl text-center border bg-card text-card-foreground shadow-sm">
            <h3 className="text-2xl font-bold text-primary font-headline">“7 out of 10 students feel unprepared — until they try Cosmivity.”</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
