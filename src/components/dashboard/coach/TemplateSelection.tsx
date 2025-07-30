
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const templates = [
  { name: "Modern Professional", category: "Professional", desc: "Clean and contemporary design perfect for tech roles." },
  { name: "Classic Executive", category: "Traditional", desc: "Traditional format ideal for corporate positions." },
  { name: "Creative Portfolio", category: "Creative", desc: "Eye-catching design for creative professionals." },
  { name: "Minimalist", category: "Minimal", desc: "Simple and clean layout focusing on content." },
  { name: "Technical Specialist", category: "Technical", desc: "A format that highlights technical skills and projects." },
  { name: "Academic Scholar", category: "Academic", desc: "Ideal for research, academia, and CVs." },
];

const categories = ["All", "Professional", "Traditional", "Creative", "Minimal", "Technical", "Academic"];

export default function TemplateSelection({ isOpen, onClose, selectedTemplate, onSelectTemplate }: { isOpen: boolean, onClose: () => void, selectedTemplate: string, onSelectTemplate: (template: string) => void }) {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] md:h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold font-headline">Choose Resume Template</DialogTitle>
          <DialogDescription>Select a template that matches your industry and style.</DialogDescription>
        </DialogHeader>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-0">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {categories.map(cat => (
                        <Button key={cat} variant={cat === "All" ? "secondary" : "ghost"} size="sm">{cat}</Button>
                    ))}
                </div>
                <ScrollArea className="flex-grow pr-4 -mr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {templates.map(template => (
                            <Card 
                                key={template.name} 
                                onClick={() => onSelectTemplate(template.name)}
                                className={cn("cursor-pointer transition-all", selectedTemplate === template.name && "ring-2 ring-primary")}
                            >
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 relative">
                                    {selectedTemplate === template.name && (
                                        <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary"/>
                                    )}
                                    <div className="p-4 bg-muted rounded-lg">
                                        <FileText className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold text-base">{template.name}</h3>
                                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="lg:col-span-1 bg-muted rounded-lg flex-col hidden lg:flex">
                 <div className="p-4 border-b">
                    <h3 className="font-semibold">Template Preview</h3>
                 </div>
                 <div className="flex-grow p-4 flex flex-col items-center justify-center text-center gap-4">
                    <FileText className="h-24 w-24 text-muted-foreground"/>
                    <h3 className="font-bold text-lg">{selectedTemplate}</h3>
                    <p className="text-sm text-muted-foreground">
                        {templates.find(t => t.name === selectedTemplate)?.desc}
                    </p>
                 </div>
            </div>
        </div>
         <div className="p-6 border-t flex justify-end">
            <Button onClick={onClose} className="neon-glow">Select Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
