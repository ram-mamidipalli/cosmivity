
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Download, RefreshCw, Save, CheckCircle } from "lucide-react";
import ResumeStepper from "@/components/dashboard/coach/ResumeStepper";
import TemplateSelection from "@/components/dashboard/coach/TemplateSelection";
import ResumeForm from "@/components/dashboard/coach/ResumeForm";

export default function CoachPage() {
  const [isTemplateSelectorOpen, setTemplateSelectorOpen] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("Modern Professional");

  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Dashboard &gt; Resume Builder</p>
                <h1 className="text-3xl font-bold font-headline">Resume Builder</h1>
                <p className="text-muted-foreground">Create a professional resume that stands out to employers</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="mr-2"/> Import Resume</Button>
                <Button variant="outline" onClick={() => setTemplateSelectorOpen(true)}><RefreshCw className="mr-2"/> Change Template</Button>
                <Button className="neon-glow"><Download className="mr-2"/> Export PDF</Button>
            </div>
        </header>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <CheckCircle className="h-5 w-5" />
                All changes saved
                <span className="text-muted-foreground text-xs">Last saved just now</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Switch id="auto-save" defaultChecked/>
                    <Label htmlFor="auto-save">Auto-save</Label>
                </div>
                <Button variant="outline" size="sm"><Save className="mr-2"/> Save</Button>
            </div>
        </div>
        
        <ResumeStepper />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <ResumeForm />
            </div>
            <div className="lg:col-span-1">
                {/* This will be the resume preview */}
            </div>
        </div>

        <TemplateSelection 
            isOpen={isTemplateSelectorOpen} 
            onClose={() => setTemplateSelectorOpen(false)}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
        />
    </div>
  );
}
