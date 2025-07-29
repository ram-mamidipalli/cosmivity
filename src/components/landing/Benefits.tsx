import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const studentBenefits = [
  "Personalized AI-driven learning paths.",
  "Boost confidence with real-world practice.",
  "Track your progress and identify weak areas.",
  "Build a standout resume that gets noticed.",
];

const collegeBenefits = [
  "Enhance student employability and placement rates.",
  "Data-driven dashboard to monitor campus performance.",
  "Bridge the industry-academia skill gap.",
  "Easy to integrate curriculum supplement.",
];

export default function Benefits() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Win-Win for Students & Colleges
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We empower individuals and institutions to achieve their goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {studentBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">For Colleges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ul className="space-y-4 flex-grow">
                {collegeBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Partner With Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
