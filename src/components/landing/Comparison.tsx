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
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why Cosmivity Beats the Old Way
          </h2>
        </div>
        <Card className="glassmorphic overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-lg font-semibold text-foreground">Feature</TableHead>
                <TableHead className="text-center text-lg font-semibold text-foreground">Cosmivity</TableHead>
                <TableHead className="text-center text-lg font-semibold text-foreground">YouTube</TableHead>
                <TableHead className="text-center text-lg font-semibold text-foreground">Coaching</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((item) => (
                <TableRow key={item.feature}>
                  <TableCell className="font-medium text-base">{item.feature}</TableCell>
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
    </section>
  );
}