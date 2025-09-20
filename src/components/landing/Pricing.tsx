import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "Limited daily challenges",
  "Basic feedback on answers",
  "Access to community forums",
];

const monthlyFeatures = [
  "Unlimited AI mock interviews",
  "Advanced resume & LinkedIn scoring",
  "Live debate rooms & team projects",
  "Full access to Career Passport",
];

const yearlyFeatures = [
    "All features from Monthly plan",
    "Priority support",
    "Early access to new features",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Simple Pricing, Built for Students
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <Card className="p-6 shadow-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Free Trial</CardTitle>
              <CardDescription>Get started for free</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">₹0</p>
              <ul className="space-y-3">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button variant="outline" className="w-full mt-6" asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </Card>
          
          <Card className="p-6 shadow-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Monthly</CardTitle>
              <CardDescription>Flexible monthly access</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">₹149 <span className="text-lg font-normal text-muted-foreground">/ month</span></p>
              <ul className="space-y-3">
                {monthlyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button variant="outline" className="w-full mt-6" asChild>
              <Link href="/auth">Choose Monthly</Link>
            </Button>
          </Card>

          <Card className="p-6 shadow-xl flex flex-col border-primary border-2 relative neon-glow transition-all duration-300 hover:scale-105 hover:shadow-2xl">
             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">Most Popular</div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary font-headline">Yearly</CardTitle>
              <CardDescription>Best value for serious learners</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">₹1499 <span className="text-lg font-normal text-muted-foreground">/ year</span></p>
              <ul className="space-y-3">
                {yearlyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button className="w-full mt-6 neon-glow" asChild>
              <Link href="/auth">Join Now</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
