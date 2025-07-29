import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="relative max-w-5xl mx-auto p-8 rounded-2xl">
           <div className="absolute inset-0 animated-gradient -z-10 rounded-2xl opacity-70"></div>
           <div className="glassmorphic p-8 rounded-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter leading-snug font-headline">
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
              <p className="mt-6 text-lg md:text-xl text-foreground/80">
                AI-driven preparation for aptitude tests, communication, and interviews — with personalized daily practice and instant feedback.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Button size="lg" className="neon-glow text-lg px-8 py-6 transition-transform duration-300 hover:scale-105" asChild>
                    <Link href="/auth">Start Free</Link>
                 </Button>
              </div>
               <p className="mt-4 text-sm text-foreground/60">
                No credit card required. First 100 users get 7 days Pro access.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
