
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb, User } from "lucide-react";

export default function ResumeForm() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex-row items-center gap-3">
             <User className="h-6 w-6 text-primary"/>
             <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Let's start with your basic details.
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <Label htmlFor="full-name">Full Name *</Label>
                <Input id="full-name" placeholder="Enter your full name"/>
             </div>
             <div className="space-y-2">
                <Label htmlFor="professional-title">Professional Title</Label>
                <Input id="professional-title" placeholder="e.g., Software Developer, Marketing Intern"/>
                <p className="text-xs text-muted-foreground">Your desired job title or current role</p>
             </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="your.email@example.com"/>
             </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210"/>
             </div>
             <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile"/>
                 <p className="text-xs text-muted-foreground">Optional but recommended</p>
             </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input id="portfolio" placeholder="https://yourportfolio.com"/>
                <p className="text-xs text-muted-foreground">Showcase your work</p>
             </div>
             <div className="md:col-span-2 space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State, Country"/>
                <p className="text-xs text-muted-foreground">Your current location or preferred work location</p>
             </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              placeholder="Write a brief summary highlighting your key skills, experience, and career objectives..."
              rows={4}
            />
             <p className="text-xs text-muted-foreground">2-3 sentences that capture your professional identity and goals</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline"><ChevronLeft className="mr-2"/> Previous</Button>
        <Button className="neon-glow">Next <ChevronRight className="ml-2"/></Button>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex-row items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-full">
                <Lightbulb className="h-6 w-6 text-primary"/>
            </div>
            <CardTitle className="text-primary">Resume Tips</CardTitle>
        </CardHeader>
        <CardContent>
             <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Keep your resume to 1-2 pages maximum</li>
                <li>Use action verbs and quantify your achievements</li>
                <li>Tailor your resume for each job application</li>
                <li>Proofread carefully for spelling and grammar errors</li>
                <li>Use a professional email address and phone number</li>
            </ul>
        </CardContent>
      </Card>

    </div>
  );
}
