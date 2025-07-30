
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { User, Book, Briefcase, Star, FolderKanban } from "lucide-react";

const steps = [
  { name: "Personal Info", icon: <User />, status: "complete" },
  { name: "Education", icon: <Book />, status: "complete" },
  { name: "Experience", icon: <Briefcase />, status: "active" },
  { name: "Skills", icon: <Star />, status: "incomplete" },
  { name: "Projects", icon: <FolderKanban />, status: "incomplete" },
];

export default function ResumeStepper() {
  const activeIndex = steps.findIndex(step => step.status === 'active');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center gap-2 text-center relative w-full">
                    <div className={cn("h-12 w-12 rounded-full flex items-center justify-center border-2",
                        step.status === 'complete' && 'bg-primary border-primary text-primary-foreground',
                        step.status === 'active' && 'bg-primary/10 border-primary text-primary',
                        step.status === 'incomplete' && 'bg-muted border-border text-muted-foreground'
                    )}>
                        {step.icon}
                    </div>
                    <p className={cn("text-sm font-medium",
                        step.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                    )}>{step.name}</p>
                     {index < steps.length - 1 && (
                        <div className={cn("absolute top-6 left-1/2 w-full h-0.5", 
                            index < activeIndex ? "bg-primary" : "bg-border"
                        )} style={{transform: 'translateX(50%)'}}></div>
                    )}
                </div>
            ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Overall Progress</span>
          <Progress value={40} className="flex-1" />
          <span className="text-sm font-bold font-code">40% Complete</span>
        </div>
      </CardContent>
    </Card>
  );
}
