
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Bubbles from "./Bubbles";

export default function Hero() {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="home" className="relative overflow-hidden py-12">
       <Bubbles />
      <div className="container mx-auto px-4 text-center">
        <div ref={ref} className="relative max-w-5xl mx-auto rounded-2xl">
           <div className="p-8 rounded-xl">
              <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter leading-snug font-headline transition-all duration-500 ease-in-out hover:scale-105", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                Struggling with Aptitude, Interviews, and English? <span className="relative inline-block">
                  <span className="text-primary">Cosmivity</span>
                  <svg
                    viewBox="0 0 285 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 left-0 w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2.35999 15.352C53.8647 10.1561 161.464 2.53673 282.64 6.13624"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span> Gets You Job-Ready — Fast.
              </h1>
              <p className={cn("mt-6 text-lg md:text-xl text-foreground/80 transition-all duration-500 delay-200 ease-in-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                AI-driven preparation for aptitude tests, communication, and interviews — with personalized daily practice and instant feedback.
              </p>
              <div className={cn("mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-300 ease-in-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                 <Button size="lg" className="neon-glow text-lg px-8 py-6 transition-transform duration-300 hover:scale-105" asChild>
                    <Link href="/auth">Start Free</Link>
                 </Button>
              </div>
               <p className={cn("mt-4 text-sm text-foreground/60 transition-all duration-500 delay-400 ease-in-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                No credit card required. First 100 users get 7 days Pro access.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
