"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
          <header className="glassmorphic rounded-2xl p-2 md:p-3">
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
    </div>
  );
}
