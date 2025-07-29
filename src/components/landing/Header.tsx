"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/30 backdrop-blur-lg">
      <div className="container flex h-20 max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">Cosmivity</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Login</Button>
          <Button className="neon-glow">Start Free</Button>
        </nav>
      </div>
    </header>
  );
}