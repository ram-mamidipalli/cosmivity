
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { User, Book, Briefcase, Star, FolderKanban } from "lucide-react";

const steps = [
  { name: "Personal Info", description: "Basic contact information", icon: <User />, status: "active" },
  { name: "Education", description: "Academic background", icon: <Book />, status: "incomplete" },
  { name: "Experience", description: "Work history", icon: <Briefcase />, status: "incomplete" },
  { name: "Skills", description: "Technical & soft skills", icon: <Star />, status: "incomplete" },
  { name: "Projects", description: "Portfolio showcase", icon: <FolderKanban />, status: "incomplete" },
];

export default function ResumeStepper() {
  const activeIndex = steps.findIndex(step => step.status === 'active');
  const progressPercentage = (activeIndex / (steps.length -1)) * 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
            {steps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center gap-2 text-center relative w-full">
                    <div className={cn("h-12 w-12 rounded-full flex items-center justify-center border-2 z-10",
                        step.status === 'complete' && 'bg-primary border-primary text-primary-foreground',
                        step.status === 'active' && 'bg-primary border-primary text-primary-foreground',
                        step.status === 'incomplete' && 'bg-muted border-border text-muted-foreground'
                    )}>
                        {step.icon}
                    </div>
                    <div className="text-center">
                        <p className={cn("text-sm font-medium",
                            step.status === 'active' ? 'text-primary' : 'text-foreground'
                        )}>{step.name}</p>
                         <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                     {index < steps.length - 1 && (
                        <div className={cn("absolute top-6 left-1/2 w-full h-0.5", 
                            index < activeIndex ? "bg-primary" : "bg-border"
                        )}></div>
                    )}
                </div>
            ))}
        </div>
        <div className="flex items-center gap-4 mt-8">
          <span className="text-sm font-medium">Overall Progress</span>
          <Progress value={20} className="flex-1" />
          <span className="text-sm font-bold font-code">20% Complete</span>
        </div>
      </CardContent>
    </Card>
  );
}
