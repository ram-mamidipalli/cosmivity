import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BrainCircuit,
  CalendarCheck,
  Users,
  MessagesSquare,
  FileText,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "AI English Coach",
    description:
      "Personalized feedback to improve your English fluency and interview skills.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
    title: "Aptitude Daily",
    description:
      "Daily quizzes and challenges to sharpen your aptitude and problem-solving skills.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Mock Interviews",
    description:
      "Practice interviews with AI and get instant feedback on your performance.",
  },
  {
    icon: <MessagesSquare className="w-8 h-8 text-primary" />,
    title: "Debate & GD Rooms",
    description:
      "Participate in group discussions and debates to enhance your communication skills.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Resume Builder",
    description:
      "Create professional, job-winning resumes with our AI-assisted builder.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    title: "College Analytics Dashboard",
    description:
      "Insights for colleges to track student progress and placement readiness.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            A Complete Toolkit for Your Career
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get ready for your dream job.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
