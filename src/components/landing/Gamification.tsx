import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart, FileCheck2 } from "lucide-react";
import Image from 'next/image';

const features = [
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "XP and Badges",
    description: "Earn points for every challenge and unlock achievement badges.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: "Weekly Reports",
    description: "Get detailed analytics on your strengths and areas for improvement.",
  },
  {
    icon: <FileCheck2 className="w-8 h-8 text-primary" />,
    title: "Shareable Career Passport",
    description: "A verified record of your skills to share with recruiters.",
  },
];

export default function Gamification() {
  return (
    <section id="gamification" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Track Your Progress, Skill by Skill
            </h2>
            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Gamification dashboard"
              width={600}
              height={450}
              className="rounded-lg shadow-xl glassmorphic"
              data-ai-hint="dashboard graph"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
