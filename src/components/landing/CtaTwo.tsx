import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaTwo() {
  return (
    <section id="cta" className="py-20 text-center">
      <div className="container mx-auto px-4 relative">
         <div className="absolute inset-0 animated-gradient -z-10 rounded-lg opacity-50"></div>
        <div className="relative p-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            Your Job Journey Starts with <span className="relative inline-block">
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
            </span>
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
            Stop guessing. Start growing with AI.
            </p>
            <div className="mt-8">
            <Button size="lg" className="neon-glow text-lg px-8 py-6 transition-transform duration-300 hover:scale-105" asChild>
                <Link href="/auth">Start Free</Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
