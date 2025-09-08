
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, Upload, Save } from "lucide-react";

const sampleCode = {
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    python: `print("Hello, World!")`,
};


export default function CompilerPage() {
    const [language, setLanguage] = useState<keyof typeof sampleCode>('python');
    const [code, setCode] = useState(sampleCode[language]);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLanguageChange = (lang: keyof typeof sampleCode) => {
        setLanguage(lang);
        setCode(sampleCode[lang]);
        setOutput('');
    }

    const handleRunCode = () => {
        setIsLoading(true);
        setOutput("Running your code...");
        // Simulate a backend call
        setTimeout(() => {
            // In a real app, you would get this from your execution engine
            const result = `Executing ${language} code...\n\nHello, World!`;
            setOutput(result);
            setIsLoading(false);
        }, 1500);
    }

  return (
    <div className="flex flex-col gap-8 h-full">
        <header className="flex items-center justify-between flex-wrap gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Online Compiler</h1>
                <p className="text-muted-foreground">Compile and run your code in multiple languages.</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow min-h-0">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Problem Statement</CardTitle>
                    <CardDescription>This is where the problem description will be displayed.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                    <p><strong>Example Problem:</strong></p>
                    <p>Write a function that takes two integers as input and returns their sum.</p>
                    <p><strong>Input:</strong> Two integers, `a` and `b`.</p>
                    <p><strong>Output:</strong> An integer representing the sum of `a` and `b`.</p>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4 min-h-0">
                 <div className="flex-shrink-0 flex items-center justify-between gap-4">
                     <Select value={language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <Code2 className="h-5 w-5" />
                                <SelectValue placeholder="Select Language" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Upload className="mr-2"/> Upload File</Button>
                        <Button variant="outline"><Save className="mr-2"/> Save Code</Button>
                    </div>
                </div>
                
                <Card className="flex-grow flex flex-col min-h-0">
                    <CardContent className="p-0 flex-1 flex flex-col">
                        <Textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            className="h-full w-full rounded-t-lg rounded-b-none border-0 border-b resize-none font-code text-base"
                        />
                    </CardContent>
                </Card>
                
                <div className="flex-shrink-0">
                     <Tabs defaultValue="output">
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="output">Output</TabsTrigger>
                                <TabsTrigger value="verdict">Verdict</TabsTrigger>
                            </TabsList>
                            <Button onClick={handleRunCode} disabled={isLoading} className="neon-glow">
                                <Play className="mr-2"/>{isLoading ? 'Running...' : 'Run Code'}
                            </Button>
                        </div>
                        <TabsContent value="output" className="mt-2">
                            <Card className="h-40">
                                <CardContent className="p-4">
                                    <pre className="text-sm text-wrap">{output || 'Output will be displayed here after running the code.'}</pre>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="verdict" className="mt-2">
                            <Card className="h-40">
                                <CardContent className="p-4">
                                    <p className="text-sm">Submit your code to see the verdict.</p>
                                </CardContent>
                            </Card>
                         </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
  );
}
