
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const categoryDetails: { [key: string]: { title: string; tests: any[] } } = {
  quantitative: {
    title: "Quantitative Aptitude Tests",
    tests: [
      { id: "arithmetic-aptitude", name: "Arithmetic Aptitude", questions: 20, time: 30 },
      { id: "data-interpretation", name: "Data Interpretation", questions: 15, time: 25 },
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `quantitative-test-${i + 1}`,
        name: `Quantitative Test ${i + 1}`,
        questions: 20,
        time: 30,
      })),
    ],
  },
  logical: {
    title: "Logical Reasoning Tests",
    tests: [
      { id: "logical-reasoning-1", name: "Logical Reasoning Test 1", questions: 15, time: 25 },
      { id: "verbal-reasoning", name: "Verbal Reasoning", questions: 20, time: 20 },
      { id: "non-verbal-reasoning", name: "Non-Verbal Reasoning", questions: 20, time: 20 },
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `logical-reasoning-${i + 2}`,
        name: `Logical Reasoning Test ${i + 2}`,
        questions: 15,
        time: 25,
      })),
    ],
  },
  verbal: {
    title: "Verbal Ability Tests",
    tests: [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `verbal-ability-${i + 1}`,
        name: `Verbal Ability Test ${i + 1}`,
        questions: 25,
        time: 20,
      })),
    ],
  },
  technical: {
    title: "Technical MCQs",
    tests: [
      { id: 'networking', name: "Networking Questions", questions: 20, time: 30 },
      { id: 'database', name: "Database Questions", questions: 20, time: 30 },
      { id: 'basic-electronics', name: "Basic Electronics", questions: 15, time: 20 },
      { id: 'digital-electronics', name: "Digital Electronics", questions: 15, time: 20 },
    ],
  },
  interview: {
      title: "Interview Prep",
      tests: [
        { id: 'hr-interview', name: "HR Interview Questions", questions: 30, time: 45 },
        { id: 'group-discussion', name: "Group Discussion Topics", questions: 10, time: 60 },
        { id: 'placement-papers', name: "Placement Papers Analysis", questions: 15, time: 30 },
      ]
  },
  programming: {
      title: "Programming Language Tests",
      tests: [
        { id: 'c-programming', name: "C Programming", questions: 20, time: 30 },
        { id: 'c-plus-plus', name: "C++ Programming", questions: 20, time: 30 },
        { id: 'java', name: "Java Programming", questions: 20, time: 30 },
        { id: 'python', name: "Python Programming", questions: 20, time: 30 },
        { id: 'c-sharp', name: "C# Programming", questions: 20, time: 30 },
      ]
  },
  gk: {
      title: "General Knowledge & Current Affairs",
      tests: [
        { id: 'current-affairs', name: "Current Affairs Quiz", questions: 25, time: 15 },
        { id: 'general-science', name: "General Science Quiz", questions: 25, time: 15 },
        { id: 'basic-gk', name: "Basic General Knowledge", questions: 25, time: 15 },
      ]
  },
  puzzles: {
      title: "Puzzles",
      tests: [
          { id: 'sudoku', name: "Sudoku", questions: 5, time: 20 },
          { id: 'number-puzzles', name: "Number Puzzles", questions: 10, time: 15 },
          { id: 'missing-letters', name: "Missing Letters Puzzles", questions: 10, time: 10 },
          { id: 'logical-puzzles', name: "Logical Puzzles", questions: 10, time: 20 },
          { id: 'clock-puzzles', name: "Clock Puzzles", questions: 10, time: 15 },
      ]
  }
};

export default function AptitudeCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const details = categoryDetails[category] || { title: "Practice Tests", tests: [] };

  const handleStartTest = (testId: string) => {
    router.push(`/dashboard/aptitude/${category}/${testId}`);
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <Link href="/dashboard/aptitude" className="text-sm text-primary hover:underline">
          &larr; Back to Practice Modules
        </Link>
        <h1 className="text-3xl font-bold font-headline mt-2">{details.title}</h1>
        <p className="text-muted-foreground">Select a test to begin your practice session.</p>
      </header>
      <Card className="glassmorphic">
        <CardContent className="p-0">
            <ul className="divide-y divide-border">
                {details.tests.map((test, index) => (
                    <li key={index} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Book className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{test.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1.5">
                                        <HelpCircle className="h-4 w-4" />
                                        <span className="font-code">{test.questions} Questions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        <span className="font-code">{test.time} Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full sm:w-auto neon-glow" onClick={() => handleStartTest(test.id)}>Start Test</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
