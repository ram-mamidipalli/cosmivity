import AiCoach from "@/components/landing/AiCoach";
import Benefits from "@/components/landing/Benefits";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Benefits />
        <AiCoach />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
