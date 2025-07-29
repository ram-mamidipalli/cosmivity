import { XCircle, CheckCircle2 } from "lucide-react";

const painPoints = [
  "Weak aptitude & reasoning",
  "Nervous in interviews",
  "Poor spoken English",
  "No real-time mentorship",
  "No structured practice",
];

export default function Problem() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            You’ve got the degree. But not the confidence.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <ul className="space-y-3">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-center text-lg">
                  <XCircle className="w-6 h-6 text-destructive mr-3 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
           <div className="glassmorphic p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-center text-primary font-headline">“7 out of 10 students feel unprepared — until they try Cosmivity.”</h3>
           </div>
        </div>
      </div>
    </section>
  );
}
