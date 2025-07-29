"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="w-full">
      <header className="container mx-auto max-w-screen-xl rounded-b-2xl p-2 md:p-3 bg-background/80 backdrop-blur-lg border-x border-b border-white/10 shadow-lg sticky top-2 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">Cosmivity</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost">Login</Button>
            <Button>Start Free</Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
