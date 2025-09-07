
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import Bubbles from "./Bubbles";

export default function Hero() {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="home" className="relative bg-background text-foreground overflow-hidden dark">
      <Bubbles />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
           <div className={cn("space-y-8 transition-all duration-700 ease-in-out", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight font-headline text-white">
                Learn In-Demand Skills. Build a Future You're Proud Of
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Master industry-relevant courses taught by experts. Learn anytime, anywhere and get certified to boost your career.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full transition-transform duration-300 hover:scale-105 neon-glow" asChild>
                    <Link href="/auth">Get Started</Link>
                 </Button>
                 <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white text-lg" asChild>
                    <Link href="#"><PlayCircle className="mr-2"/>Watch Intro Video</Link>
                 </Button>
              </div>
           </div>
           <div className={cn("relative transition-all duration-700 delay-200 ease-in-out", isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")}>
                <div className="relative z-10">
                    <Image 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800"
                        width={800}
                        height={900}
                        alt="A smiling student holding a book"
                        className="w-full h-auto max-w-md mx-auto"
                        data-ai-hint="smiling student"
                    />
                </div>
           </div>
        </div>
      </div>
    </section>
  );
}
