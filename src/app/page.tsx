import Achievements from "@/components/landing/Achievements";
import Comparison from "@/components/landing/Comparison";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Gamification from "@/components/landing/Gamification";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Problem from "@/components/landing/Problem";
import Testimonials from "@/components/landing/Testimonials";
import CtaTwo from "@/components/landing/CtaTwo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrustedBy from "@/components/landing/TrustedBy";
import Partners from "@/components/landing/Partners";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div>
          <Achievements />
          <Problem />
          <Features />
          <Testimonials />
          <Gamification />
          <TrustedBy />
          <Partners />
          <Comparison />
          <Pricing />
          <CtaTwo />
        </div>
      </main>
      <Footer />
    </div>
  );
}
