
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Bubbles from "./Bubbles";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="home" className="relative bg-background text-foreground overflow-hidden dark min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80')", backgroundAttachment: 'fixed'}}
        data-ai-hint="galaxy stars"
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>
      <Bubbles />
      <div className="container mx-auto px-4 py-20 relative">
        <div ref={ref} className={cn("transition-all duration-700 ease-in-out", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <p className="font-body text-sm uppercase tracking-widest text-primary">👉 Welcome to Cosmivity</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight font-headline text-white">
                    Practice <span className="text-primary">✦</span> Improve &amp; <br />
                    Get Hired <span className="text-primary text-4xl md:text-5xl lg:text-6xl leading-none">→</span> Confidently
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                    An AI-powered platform to sharpen your aptitude, boost communication, and ace interviews — all in one place.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full transition-transform duration-300 hover:scale-105 neon-glow" asChild>
                        <Link href="/auth">Start Learning</Link>
                    </Button>
                     <Button size="lg" variant="outline" className="text-white hover:bg-white/10 hover:text-white border-white/20 text-lg px-8 py-6 rounded-full transition-transform duration-300 hover:scale-105">
                        <PlayCircle className="mr-2" />
                        Watch Demo
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
