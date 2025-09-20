
"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";

export default function NotebookPage() {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("Start writing your notes here...");
  const { toast } = useToast();
  const noteRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (noteRef.current) {
      html2canvas(noteRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${title.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({
          title: "Note Downloaded!",
          description: "Your note has been saved as a PNG image.",
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
                <Download className="mr-2"/> Download as PNG
            </Button>
        </div>
      </header>
      <div className="flex-grow">
        <Card ref={noteRef} className="h-full">
            <CardContent className="p-6 h-full flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                />
                <Textarea
                    placeholder="Start writing your notes here..."
                    className="flex-grow text-base p-4 h-full w-full resize-none border-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
