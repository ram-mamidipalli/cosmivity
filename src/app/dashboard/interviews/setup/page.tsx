
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Video, Mic, BrainCircuit, Play } from "lucide-react";

export default function SetupInterviewPage() {
  return (
    <div className="flex justify-center items-center min-h-full p-4">
      <Card className="w-full max-w-2xl glassmorphic">
        <CardHeader className="text-center items-center">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Video className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Setup Your Mock Interview</CardTitle>
            <CardDescription>Configure your interview session for personalized practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-8">
            <div>
                <Label htmlFor="resume-upload" className="font-semibold">Upload Resume (Optional)</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                    <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                        <Label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                        >
                            <span>Click to upload your resume</span>
                            <Input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </Label>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="job-role">Target Job Role *</Label>
                    <Select>
                        <SelectTrigger id="job-role">
                            <SelectValue placeholder="Select the role you're applying for" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="swe">Software Engineer</SelectItem>
                            <SelectItem value="pm">Product Manager</SelectItem>
                            <SelectItem value="da">Data Analyst</SelectItem>
                            <SelectItem value="ux">UX Designer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="interview-type">Interview Type *</Label>
                    <Select>
                        <SelectTrigger id="interview-type">
                            <SelectValue placeholder="Choose interview focus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technical">Technical Round</SelectItem>
                            <SelectItem value="behavioral">Behavioral Round</SelectItem>
                            <SelectItem value="hr">HR Round</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select>
                        <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select based on your experience" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="duration">Interview Duration *</Label>
                    <Select>
                        <SelectTrigger id="duration">
                            <SelectValue placeholder="How long should the interview be?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label className="font-semibold">Interview Features</Label>
                <div className="space-y-4 mt-2">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Video className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Video Recording</p>
                                <p className="text-xs text-muted-foreground">Record your responses for review</p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Mic className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Audio Transcription</p>
                                <p className="text-xs text-muted-foreground">Convert speech to text</p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <BrainCircuit className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">AI Feedback</p>
                                <p className="text-xs text-muted-foreground">Get detailed performance analysis</p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>

            <Button size="lg" className="w-full text-lg neon-glow">
                <Play className="mr-2 h-5 w-5"/>
                Start Mock Interview
            </Button>
            <p className="text-xs text-muted-foreground text-center">Your interview will be private and secure. Data is used only for feedback generation.</p>

        </CardContent>
      </Card>
    </div>
  );
}
