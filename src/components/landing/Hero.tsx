import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tighter leading-tight">
              Empowering Students with Skills That Get Jobs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Master English, Aptitude, and Interview Skills through AI-powered
              practice.
            </p>
            <Button size="lg">Take Free Diagnostic Test</Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Students preparing for a job"
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
              data-ai-hint="students job preparation"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
