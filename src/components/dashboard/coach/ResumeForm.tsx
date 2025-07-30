
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

export default function ResumeForm() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>
            Write 2-3 sentences that capture your professional identity and goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="e.g., Results-driven software engineer with a passion for developing innovative solutions..."
              rows={5}
            />
             <p className="text-xs text-muted-foreground">Preview updates automatically as you type</p>
          </div>
        </CardContent>
      </Card>
      
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

      <div className="flex justify-between">
        <Button variant="outline"><ChevronLeft className="mr-2"/> Previous</Button>
        <Button className="neon-glow">Next <ChevronRight className="ml-2"/></Button>
      </div>
    </div>
  );
}
