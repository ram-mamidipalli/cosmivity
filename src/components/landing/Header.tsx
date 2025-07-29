"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">Cosmivity</span>
        </Link>
        <nav className="flex items-center">
          <Button>Take Free Diagnostic Test</Button>
        </nav>
      </div>
    </header>
  );
}
