
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const categoryDetails: { [key: string]: { title: string; tests: any[] } } = {
  quantitative: {
    title: "Quantitative Aptitude",
    tests: [
        { id: "percentages", name: "Percentages", questions: 15, time: 20 },
        { id: "ratio-and-proportion", name: "Ratio & Proportion", questions: 15, time: 20 },
        { id: "profit-loss-and-partnership", name: "Profit, Loss & Partnership", questions: 15, time: 25 },
        { id: "averages-mixture-and-alligations", name: "Averages, Mixture & Alligations", questions: 15, time: 25 },
        { id: "time-and-work", name: "Time and Work", questions: 15, time: 20 },
        { id: "time-speed-and-distance", name: "Time, Speed and Distance", questions: 15, time: 20 },
        { id: "simple-and-compound-interest", name: "Simple and Compound Interest", questions: 15, time: 20 },
        { id: "number-system", name: "Number System", questions: 15, time: 15 },
        { id: "number-series", name: "Number Series", questions: 15, time: 15 },
        { id: "simplification", name: "Simplification", questions: 15, time: 15 },
    ],
  },
  logical: {
    title: "Logical Reasoning",
    tests: [
      { id: "alphanumeric-series", name: "AlphaNumeric Series", questions: 15, time: 20 },
      { id: "blood-relations", name: "Blood Relations", questions: 15, time: 15 },
      { id: "coding-decoding", name: "Coding-Decoding", questions: 15, time: 20 },
      { id: "data-sufficiency", name: "Data Sufficiency", questions: 15, time: 25 },
      { id: "direction-sense", name: "Direction Sense", questions: 15, time: 15 },
      { id: "statement-and-conclusion", name: "Statement & Conclusion", questions: 15, time: 20 },
      { id: "syllogism", name: "Syllogism", questions: 15, time: 20 },
      { id: "calendar-and-clock", name: "Calendar & Clock", questions: 15, time: 15 },
    ],
  },
  verbal: {
    title: "Verbal Ability",
    tests: [
      { id: "synonym-antonym", name: "Synonym & Antonym", questions: 15, time: 10 },
      { id: "fill-in-the-blanks", name: "Fill in the Blanks", questions: 15, time: 10 },
      { id: "find-the-error", name: "Find the Error", questions: 15, time: 15 },
      { id: "verbal-analogies", name: "Verbal Analogies", questions: 15, time: 10 },
      { id: "sentence-correction", name: "Sentence Correction", questions: 15, time: 15 },
      { id: "reading-comprehension", name: "Reading Comprehension", questions: 15, time: 20 },
      { id: "parajumbles", name: "Parajumbles", questions: 15, time: 15 },
      { id: "meanings-vocabulary", name: "Vocabulary / Meanings", questions: 15, time: 10 },
      { id: "cloze-test", name: "Cloze Test", questions: 15, time: 15 },
      { id: "idiom-phrases", name: "Idioms & Phrases", questions: 15, time: 10 },
      { id: "critical-reasoning", name: "Critical Reasoning", questions: 15, time: 20 },
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
      title: "Programming Language Practice",
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
  const details = categoryDetails[category] || { title: "Practice Topics", tests: [] };

  const handleStartPractice = (testId: string, questions: number) => {
    router.push(`/dashboard/aptitude/${category}/${testId}?questions=${questions}`);
  }

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <header className="p-6 border bg-card rounded-lg">
        <Link href="/dashboard/aptitude" className="text-sm text-primary hover:underline">
          &larr; Back to Practice Modules
        </Link>
        <h1 className="text-3xl font-bold font-headline mt-2">{details.title}</h1>
        <p className="text-muted-foreground">Select a topic to begin your practice session.</p>
      </header>
      <Card>
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
                        <Button className="w-full sm:w-auto" onClick={() => handleStartPractice(test.id, test.questions)}>Start Practice</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}

    