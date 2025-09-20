
"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function NotebookPage() {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("Start writing your notes here...");
  const { toast } = useToast();
  const noteRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (noteRef.current) {
      html2canvas(noteRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        const ratio = canvasWidth / pdfWidth;
        const imgHeight = canvasHeight / ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
        
        pdf.save(`${title.replace(/\s+/g, '-')}.pdf`);

        toast({
          title: "Note Downloaded!",
          description: "Your note has been saved as a PDF file.",
        });
      });
    }
  };

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 md:p-8 gap-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Notebook</h1>
            <p className="text-muted-foreground">Your personal space to jot down thoughts, ideas, and notes.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={handleDownload}>
                <Download className="mr-2"/> Download as PDF
            </Button>
        </div>
      </header>
      <div className="flex-grow">
        <Card className="h-full">
            <CardContent className="p-0 h-full">
                <div ref={noteRef} className="p-6 h-full flex flex-col gap-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    />
                    <Textarea
                        placeholder="Start writing your notes here..."
                        className="flex-grow text-base p-0 h-full w-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
