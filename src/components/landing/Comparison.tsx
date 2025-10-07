import { Check, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "../ui/card";

const comparisonData = [
  { feature: "AI-Personalized Practice", cosmivity: true, youtube: false, coaching: false },
  { feature: "Instant Interview Feedback", cosmivity: true, youtube: false, coaching: false },
  { feature: "Structured Daily Learning", cosmivity: true, youtube: false, coaching: true },
  { feature: "Resume & LinkedIn Scoring", cosmivity: true, youtube: false, coaching: false },
  { feature: "Gamified Progress Tracking", cosmivity: true, youtube: false, coaching: false },
  { feature: "Affordable & On-Demand", cosmivity: true, youtube: true, coaching: false },
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-20 bg-background dark">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">
            Why Cosmivity Beats the Old Way
          </h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden bg-card/50 border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="w-1/2 text-lg font-semibold text-white">Feature</TableHead>
                  <TableHead className="text-center text-lg font-semibold text-white">Cosmivity</TableHead>
                  <TableHead className="text-center text-lg font-semibold text-white">YouTube</TableHead>
                  <TableHead className="text-center text-lg font-semibold text-white">Coaching</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item) => (
                  <TableRow key={item.feature} className="border-white/10">
                    <TableCell className="font-medium text-base text-white/80">{item.feature}</TableCell>
                    <TableCell className="text-center">
                      {item.cosmivity ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-destructive" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.youtube ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-destructive" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.coaching ? <Check className="mx-auto h-6 w-6 text-green-500" /> : <X className="mx-auto h-6 w-6 text-destructive" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  );
}
