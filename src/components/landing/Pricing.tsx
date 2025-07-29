import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

const freeFeatures = [
  "Limited daily challenges",
  "Basic feedback on answers",
  "Access to community forums",
];

const proFeatures = [
  "Unlimited AI mock interviews",
  "Advanced resume & LinkedIn scoring",
  "Live debate rooms & team projects",
  "Full access to Career Passport",
  "Priority support",
];

export default function Pricing() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Simple Pricing, Built for Students
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 shadow-lg flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Get started for free</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">₹0</p>
              <ul className="space-y-3">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button variant="outline" className="w-full mt-6">Get Started</Button>
          </Card>
          <Card className="p-6 shadow-xl flex flex-col border-primary border-2 relative neon-glow">
             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">Most Popular</div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Pro</CardTitle>
              <CardDescription>Unlock your full potential</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">₹499 <span className="text-lg font-normal text-muted-foreground">/ month</span></p>
              <ul className="space-y-3">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button className="w-full mt-6 neon-glow">Join Now</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}