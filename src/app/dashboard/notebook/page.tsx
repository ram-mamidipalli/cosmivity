
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, PlusCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "note-1", title: "My First Note", content: "" },
  ]);
  const [activeTab, setActiveTab] = useState("note-1");
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, you would save this to a database.
    toast({
      title: "Notes Saved!",
      description: "Your notes have been saved locally.",
    });
  };

  const addNote = () => {
    const newNoteId = `note-${Date.now()}`;
    const newNote: Note = {
      id: newNoteId,
      title: `Note ${notes.length + 1}`,
      content: "",
    };
    setNotes([...notes, newNote]);
    setActiveTab(newNoteId);
  };
  
  const removeNote = (noteIdToRemove: string) => {
    // Prevent removing the last note
    if (notes.length <= 1) {
        toast({
            variant: "destructive",
            title: "Cannot remove the last note.",
        });
        return;
    }
    const noteIndex = notes.findIndex(n => n.id === noteIdToRemove);
    const newNotes = notes.filter((note) => note.id !== noteIdToRemove);
    setNotes(newNotes);

    // If the active tab is being removed, switch to a different tab
    if (activeTab === noteIdToRemove) {
      if (noteIndex > 0) {
        setActiveTab(newNotes[noteIndex-1].id);
      } else {
        setActiveTab(newNotes[0].id);
      }
    }
  };

  const updateNoteContent = (noteId: string, content: string) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, content } : note)));
  };

  const updateNoteTitle = (noteId: string, title: string) => {
     setNotes(notes.map((note) => (note.id === noteId ? { ...note, title } : note)));
  }

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 md:p-8 gap-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Notebook</h1>
            <p className="text-muted-foreground">Your personal space to jot down thoughts, ideas, and notes.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={addNote}>
                <PlusCircle className="mr-2"/> New Note
            </Button>
            <Button onClick={handleSave}>
                <Save className="mr-2"/> Save All Notes
            </Button>
        </div>
      </header>
      <div className="flex-grow flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
            <div className="flex items-center">
              <TabsList>
                  {notes.map((note) => (
                      <TabsTrigger key={note.id} value={note.id} className="relative group pr-8">
                          <Input 
                            value={note.title}
                            onChange={(e) => updateNoteTitle(note.id, e.target.value)}
                            className="bg-transparent border-none focus-visible:ring-0 p-0 h-auto"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 h-full w-8 opacity-50 group-hover:opacity-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeNote(note.id);
                            }}
                          >
                            <X className="h-4 w-4"/>
                          </Button>
                      </TabsTrigger>
                  ))}
              </TabsList>
            </div>
            {notes.map((note) => (
                <TabsContent key={note.id} value={note.id} className="flex-grow mt-2">
                    <Textarea
                        placeholder="Start writing your notes here..."
                        className="flex-grow text-base p-4 h-full"
                        value={note.content}
                        onChange={(e) => updateNoteContent(note.id, e.target.value)}
                    />
                </TabsContent>
            ))}
        </Tabs>
      </div>
    </div>
  );
}
