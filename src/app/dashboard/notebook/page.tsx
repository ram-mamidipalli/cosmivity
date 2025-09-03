"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NotebookPage() {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, you would save this to a database.
    // For now, we'll just show a toast notification.
    toast({
      title: "Notes Saved!",
      description: "Your notes have been saved locally.",
    });
  };

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 md:p-8 gap-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Notebook</h1>
            <p className="text-muted-foreground">Your personal space to jot down thoughts, ideas, and notes.</p>
        </div>
        <Button onClick={handleSave}>
            <Save className="mr-2"/> Save Notes
        </Button>
      </header>
      <div className="flex-grow flex flex-col">
        <Textarea
          placeholder="Start writing your notes here..."
          className="flex-grow text-base p-4 h-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
