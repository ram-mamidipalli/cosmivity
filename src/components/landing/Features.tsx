import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BrainCircuit,
  CalendarCheck,
  MessageSquare,
  FileText,
  Users,
  Award,
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "Smart Aptitude Challenges",
    description:
      "Daily adaptive quizzes to sharpen your reasoning and problem-solving skills.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "AI Mock Interviews",
    description:
      "Practice interviews with an AI, get instant performance feedback.",
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: "Communication Lab",
    description:
      "Improve your spoken English, fluency, and confidence.",
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Resume & LinkedIn Coach",
    description:
      "Optimize your resume and LinkedIn profile for ATS and recruiters.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Team Projects + Group Debates",
    description:
      "Collaborate on projects and participate in group discussions.",
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: "Gamified XP + Career Passport",
    description:
      "Earn points, unlock badges, and build your shareable career profile.",
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Meet Cosmivity — Your Career Launchpad
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 glassmorphic transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4 text-xl font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
