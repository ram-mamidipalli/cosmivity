
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, PlusCircle, X, Notebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "note-1", title: "My First Note", content: "This is the content of my first note." },
    { id: "note-2", title: "Meeting Ideas", content: "- Discuss Q3 roadmap\n- Brainstorm new features" },
    { id: "note-3", title: "Shopping List", content: "Milk, Bread, Eggs" },
  ]);
  const [activeNoteId, setActiveNoteId] = useState("note-1");
  const { toast } = useToast();
  
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

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
      title: `Untitled Note`,
      content: "",
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNoteId);
  };
  
  const removeNote = (noteIdToRemove: string) => {
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

    if (activeNoteId === noteIdToRemove) {
      if (noteIndex > 0) {
        setActiveNoteId(newNotes[noteIndex - 1].id);
      } else {
        setActiveNoteId(newNotes[0].id);
      }
    }
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, ...updates } : note)));
  };

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
      <div className="grid lg:grid-cols-4 gap-8 flex-grow">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Notebook className="h-5 w-5"/> Saved Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {notes.map(note => (
                        <Button 
                            key={note.id}
                            variant={note.id === activeNoteId ? 'secondary' : 'ghost'}
                            className="w-full justify-start group"
                            onClick={() => setActiveNoteId(note.id)}
                        >
                            <span className="flex-1 text-left truncate">{note.title}</span>
                             <X 
                                className="h-4 w-4 ml-2 text-muted-foreground opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeNote(note.id);
                                }}
                            />
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
        <div className="lg:col-span-3 flex flex-col gap-4">
            {activeNote ? (
                <>
                    <input
                        type="text"
                        value={activeNote.title}
                        onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                        className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Textarea
                        key={activeNote.id}
                        placeholder="Start writing your notes here..."
                        className="flex-grow text-base p-4 h-full"
                        value={activeNote.content}
                        onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                    />
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Select a note or create a new one to get started.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
