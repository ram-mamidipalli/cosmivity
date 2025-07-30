
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Download, RefreshCw, Save, CheckCircle } from "lucide-react";
import ResumeStepper from "@/components/dashboard/coach/ResumeStepper";
import ResumeForm from "@/components/dashboard/coach/ResumeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CoachPage() {
  const [isTemplateSelectorOpen, setTemplateSelectorOpen] = useState(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    if (resumePreviewRef.current) {
        html2canvas(resumePreviewRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('resume.pdf');
        });
    }
  };


  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Resume Builder</h1>
                <p className="text-muted-foreground">Create a professional resume that stands out to employers</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="mr-2"/> Import Resume</Button>
                <Button variant="outline" onClick={() => setTemplateSelectorOpen(true)}><RefreshCw className="mr-2"/> Change Template</Button>
                <Button className="neon-glow" onClick={handleExportPdf}><Download className="mr-2"/> Export PDF</Button>
            </div>
        </header>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <CheckCircle className="h-5 w-5" />
                All changes saved
                <span className="text-muted-foreground text-xs ml-2">Last saved just now</span>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div ref={resumePreviewRef} className="bg-card p-4 rounded-lg aspect-[8.5/11] flex flex-col items-center justify-center border">
                           <div className="w-full h-32 bg-primary rounded-t-lg flex flex-col items-center justify-center text-primary-foreground p-4">
                               <h3 className="text-2xl font-bold">Your Name</h3>
                               <p>Professional Title</p>
                           </div>
                           <div className="flex-grow bg-card w-full p-4">
                                <p className="text-sm text-muted-foreground text-center mt-4">Preview updates automatically as you type</p>
                           </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
