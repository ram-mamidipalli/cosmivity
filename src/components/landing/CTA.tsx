import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Ready to Launch Your Career?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
          Start your personalized journey today. Join thousands of students
          getting ahead with Cosmivity.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary">
            Join Now – It’s Free
          </Button>
        </div>
      </div>
    </section>
  );
}
