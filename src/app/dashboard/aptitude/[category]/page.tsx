
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const categoryDetails: { [key: string]: { title: string; tests: any[] } } = {
  quantitative: {
    title: "Quantitative Aptitude Tests",
    tests: [
      { name: "Aptitude Test (Random Questions)", questions: 20, time: 30 },
      ...Array.from({ length: 10 }, (_, i) => ({
        name: `Aptitude Test ${i + 1}`,
        questions: 20,
        time: 30,
      })),
    ],
  },
  logical: {
    title: "Logical Reasoning Tests",
    tests: [
        ...Array.from({ length: 10 }, (_, i) => ({
            name: `Logical Reasoning Test ${i + 1}`,
            questions: 15,
            time: 25,
        })),
    ],
  },
  verbal: {
    title: "Verbal Ability Tests",
    tests: [
        ...Array.from({ length: 10 }, (_, i) => ({
            name: `Verbal Ability Test ${i + 1}`,
            questions: 25,
            time: 20,
        })),
    ],
  },
  technical: {
    title: "Technical Practice Tests",
    tests: [
        { name: "Data Structures & Algorithms", questions: 20, time: 45 },
        { name: "C Programming", questions: 20, time: 30 },
        { name: "Java Programming", questions: 20, time: 30 },
        { name: "Python Programming", questions: 20, time: 30 },
        { name: "Databases", questions: 15, time: 20 },
    ],
  },
};

export default function AptitudeCategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const details = categoryDetails[category] || { title: "Practice Tests", tests: [] };

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
                                        <span>{test.questions} Questions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        <span>{test.time} Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full sm:w-auto neon-glow">Start Test</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
