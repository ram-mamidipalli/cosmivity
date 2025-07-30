
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Lightbulb, MessageCircle, Trophy, Code } from "lucide-react";

const modules = [
  {
    title: "Quantitative Aptitude",
    description: "Practice numerical problems, data interpretation, and mathematical concepts.",
    icon: <Calculator className="h-10 w-10 text-primary" />,
    buttonText: "Start Practice",
  },
  {
    title: "Logical Reasoning",
    description: "Sharpen your analytical and critical thinking skills with puzzles and scenarios.",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    buttonText: "Start Practice",
  },
    {
    title: "Verbal Ability",
    description: "Improve your grammar, vocabulary, and reading comprehension.",
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    buttonText: "Start Practice",
  },
  {
    title: "Daily Challenges",
    description: "Take on daily timed quizzes to test your speed and accuracy under pressure.",
    icon: <Trophy className="h-10 w-10 text-primary" />,
    buttonText: "View Challenges",
  },
  {
    title: "Technical Practice",
    description: "Hone your coding skills with practice problems in various languages.",
    icon: <Code className="h-10 w-10 text-primary" />,
    buttonText: "Start Coding",
  },
];

export default function AptitudePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Practice</h1>
          <p className="text-muted-foreground">Select a module to sharpen your skills.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="flex flex-col glassmorphic hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {module.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full neon-glow">{module.buttonText}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
