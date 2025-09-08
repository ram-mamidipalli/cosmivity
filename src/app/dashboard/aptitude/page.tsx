
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Lightbulb, MessageCircle, Trophy, Code, Users, Brain, FileText, Puzzle, BookOpen } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Quantitative Aptitude",
    description: "Practice numerical problems, data interpretation, and mathematical concepts.",
    icon: <Calculator className="h-10 w-10 text-primary" />,
    buttonText: "View Tests",
    href: "/dashboard/aptitude/quantitative",
  },
  {
    title: "Logical Reasoning",
    description: "Sharpen your analytical and critical thinking skills with puzzles and scenarios.",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    buttonText: "View Tests",
    href: "/dashboard/aptitude/logical",
  },
    {
    title: "Verbal Ability",
    description: "Improve your grammar, vocabulary, and reading comprehension.",
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    buttonText: "View Tests",
    href: "/dashboard/aptitude/verbal",
  },
  {
    title: "Interview Prep",
    description: "Prepare for HR interviews, group discussions, and review placement papers.",
    icon: <Users className="h-10 w-10 text-primary" />,
    buttonText: "View Topics",
    href: "/dashboard/aptitude/interview",
  },
  {
    title: "Programming",
    description: "Practice coding questions in C, C++, Java, and other languages.",
    icon: <Code className="h-10 w-10 text-primary" />,
    buttonText: "View Languages",
    href: "/dashboard/aptitude/programming",
  },
  {
    title: "General Knowledge",
    description: "Stay updated with current affairs and general science knowledge.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    buttonText: "View Quizzes",
    href: "/dashboard/aptitude/gk",
  },
   {
    title: "Technical MCQs",
    description: "Test your knowledge on networking, databases, and electronics.",
    icon: <Brain className="h-10 w-10 text-primary" />,
    buttonText: "View MCQs",
    href: "/dashboard/aptitude/technical",
  },
  {
    title: "Daily Challenges",
    description: "Take on daily timed quizzes to test your speed and accuracy under pressure.",
    icon: <Trophy className="h-10 w-10 text-primary" />,
    buttonText: "View Challenges",
    href: "/dashboard/challenges",
  },
   {
    title: "Puzzles",
    description: "Solve Sudoku, number puzzles, and other logical brain-teasers.",
    icon: <Puzzle className="h-10 w-10 text-primary" />,
    buttonText: "Solve Puzzles",
    href: "/dashboard/aptitude/puzzles",
  },
];

export default function AptitudePage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <header className="p-6 border bg-card rounded-lg">
        <div>
          <h1 className="text-3xl font-bold font-headline">Practice</h1>
          <p className="text-muted-foreground">Select a module to sharpen your skills.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
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
              <Button className="w-full" asChild>
                <Link href={module.href}>{module.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
