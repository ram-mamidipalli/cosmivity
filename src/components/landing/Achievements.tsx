import { GraduationCap, BookOpen, Briefcase, Star } from "lucide-react";

const achievements = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    value: "50,000+",
    label: "Students Trained",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    value: "100+",
    label: "Industry-Relevant Courses",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    value: "85%",
    label: "Placement Success",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    value: "4.8/5",
    label: "Average Course Rating",
  },
];

export default function Achievements() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Our Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {achievements.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              {item.icon}
              <p className="text-3xl font-bold text-primary">{item.value}</p>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
