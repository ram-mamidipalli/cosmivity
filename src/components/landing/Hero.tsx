import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-24 md:py-32">
       <div className="absolute inset-0 animated-gradient -z-10"></div>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto glassmorphic p-8 rounded-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tighter leading-tight font-headline">
            Struggling with Aptitude, Interviews, and English? Cosmivity Gets You Job-Ready — Fast.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            AI-driven preparation for aptitude tests, communication, and interviews — with personalized daily practice and instant feedback.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button size="lg" className="neon-glow text-lg px-8 py-6">Start Free</Button>
          </div>
           <p className="mt-4 text-sm text-foreground/60">
            No credit card required. First 100 users get 7 days Pro access.
          </p>
        </div>
      </div>
    </section>
  );
}
