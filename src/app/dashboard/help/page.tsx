
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LifeBuoy } from "lucide-react";

export default function HelpPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
        toast({
            variant: "destructive",
            title: "Missing Fields",
            description: "Please fill out both the subject and message.",
        });
        return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setSubject("");
        setMessage("");
        toast({
            title: "Query Sent!",
            description: "Your message has been sent to the Cosmivity team. We'll get back to you shortly.",
        });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Help Center</h1>
                <p className="text-muted-foreground">Have a question or need support? Let us know.</p>
            </div>
        </header>
        <Card className="max-w-2xl mx-auto w-full">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <LifeBuoy className="h-8 w-8 text-primary"/>
                </div>
                <CardTitle>Submit a Request</CardTitle>
                <CardDescription>Our team will get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                            id="subject" 
                            placeholder="e.g., Issue with Mock Interview" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                            id="message" 
                            placeholder="Please describe your issue or question in detail..." 
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
