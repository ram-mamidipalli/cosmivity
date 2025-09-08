
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { CircularProgress } from "@/components/ui/circular-progress";

export default function ResumeAnalysis() {
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisDone, setAnalysisDone] = useState(false);
    
    const improvements = [
        "Add more quantifiable results to your experience bullet points.",
        "Incorporate keywords from the job description like 'TypeScript' and 'Agile'.",
        "Your professional summary could be more concise and impactful.",
        "Ensure consistent formatting for dates across all sections."
    ];

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setAnalysisDone(false);
        // Simulate API call
        setTimeout(() => {
            setScore(78);
            setIsAnalyzing(false);
            setAnalysisDone(true);
        }, 2000);
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>AI Resume Analysis</CardTitle>
                    <Lightbulb className="w-6 h-6 text-primary"/>
                </div>
                <CardDescription>Get an instant ATS score and suggestions to improve your resume.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <CircularProgress value={score} size={150} strokeWidth={10} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-primary">{isAnalyzing ? '...' : `${score}%`}</span>
                        <span className="text-sm text-muted-foreground">ATS Score</span>
                    </div>
                </div>
                {!analysisDone && (
                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                    </Button>
                )}
            </CardContent>
            {analysisDone && (
                <CardFooter className="flex-col items-start gap-4">
                     <h4 className="font-semibold">Improvement Suggestions</h4>
                     <ul className="space-y-3">
                        {improvements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                     </ul>
                </CardFooter>
            )}
        </Card>
    )
}
