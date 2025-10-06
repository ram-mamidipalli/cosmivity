"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-bold text-lg text-primary hover:opacity-80 transition-opacity"
            >
              Cosmivity
            </Link>
             <p className="text-sm text-muted-foreground mt-1">
               Made in India 🇮🇳 | Powered by AI | © Cosmivity 2025
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a
              href="mailto:cosmivity@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              cosmivity@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
