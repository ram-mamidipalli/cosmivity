
"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                  <DialogDescription>
                    Last updated: July 26, 2024
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-96 pr-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>Welcome to Cosmivity! These terms and conditions outline the rules and regulations for the use of Cosmivity's Website, located at cosmivity.com.</p>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Cosmivity if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <h3 className="font-semibold text-foreground">1. License</h3>
                    <p>Unless otherwise stated, Cosmivity and/or its licensors own the intellectual property rights for all material on Cosmivity. All intellectual property rights are reserved. You may access this from Cosmivity for your own personal use subjected to restrictions set in these terms and conditions.</p>
                    <p>You must not:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Republish material from Cosmivity</li>
                      <li>Sell, rent or sub-license material from Cosmivity</li>
                      <li>Reproduce, duplicate or copy material from Cosmivity</li>
                      <li>Redistribute content from Cosmivity</li>
                    </ul>
                    <h3 className="font-semibold text-foreground">2. User Content</h3>
                    <p>In these terms and conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Cosmivity a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                  <DialogDescription>
                    Last updated: July 26, 2024
                  </DialogDescription>
                </DialogHeader>
                 <ScrollArea className="h-96 pr-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>Your privacy is important to us. It is Cosmivity's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                    <h3 className="font-semibold text-foreground">1. Information we collect</h3>
                    <p>Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
                    <p>Personal information: We may ask for personal information, such as your name, email, social media profiles, and payment information.</p>
                     <h3 className="font-semibold text-foreground">2. Use of information</h3>
                    <p>We may use information to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
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
