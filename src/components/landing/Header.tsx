
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

export default function Header() {
  return (
    <div className="w-full fixed top-0 z-50 flex justify-center pt-4">
      <div className="container mx-auto px-4">
        <header className="bg-background/20 backdrop-blur-lg rounded-full border border-white/10 shadow-lg p-2 md:p-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80 pl-4">
              <span className="font-bold text-xl text-white relative">
                Cosmivity
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white"><Link href="/auth">Login</Link></Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full neon-glow"><Link href="/auth">Enroll Now</Link></Button>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 p-4">
                    <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                       <span className="font-bold text-2xl text-primary relative">
                        Cosmivity
                       </span>
                    </Link>
                    <div className="flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <Link
                            key={link.href}
                            href={link.href}
                            className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors"
                            >
                            {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Button variant="ghost" asChild><Link href="/auth">Login</Link></Button>
                        <Button asChild><Link href="/auth">Enroll Now</Link></Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
