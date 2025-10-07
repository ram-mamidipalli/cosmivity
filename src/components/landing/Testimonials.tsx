import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "I got into Wipro after 3 rejections — Cosmivity changed everything!",
    name: "Priya Sharma",
    title: "Placed at Wipro",
    avatar: "https://images.unsplash.com/photo-1712298682916-fa04c18156b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "woman smiling"
  },
  {
    quote: "Speaking fluently in interviews became easy. The AI coach is brilliant.",
    name: "Rohan Das",
    title: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTcyNDcwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "man portrait"
  },
  {
    quote: "Loved the team challenges and the feedback loop. It's like a gym for your career skills.",
    name: "Aisha Khan",
    title: "Recent Graduate",
    avatar: "https://images.unsplash.com/photo-1610655507808-a59293f4e332?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc1NzI0NzA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "woman portrait"
  },
  {
    quote: "The aptitude section is a lifesaver. I finally cleared the quantitative round for a top tech company.",
    name: "Suresh Gupta",
    title: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1708458662177-8e12e1b6702d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "man professional"
  },
  {
    quote: "My resume score went from 60 to 95 in a week. The AI suggestions are pure gold.",
    name: "Anjali Mehta",
    title: "Marketing Intern",
    avatar: "https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NTcyNDcwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "woman professional"
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background text-foreground dark">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">
            Real Students. Real Results.
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card
                    className="p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl neon-glow h-full flex flex-col justify-between bg-card"
                  >
                    <CardContent className="p-0 flex-grow">
                      <p className="text-lg text-card-foreground/80 mb-6">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="flex items-center mt-auto">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/20 hover:bg-white/10" />
          <CarouselNext className="text-white border-white/20 hover:bg-white/10"/>
        </Carousel>
      </div>
    </section>
  );
}
