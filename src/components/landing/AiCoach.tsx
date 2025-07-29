"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  aiEnglishCoach,
  type AiEnglishCoachInput,
} from "@/ai/flows/ai-english-coach";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  text: z
    .string()
    .min(10, { message: "Please enter at least 10 characters." })
    .max(2000, { message: "Text cannot exceed 2000 characters." }),
  interviewContext: z.string().optional(),
});

export default function AiCoach() {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      interviewContext: "A job interview for a software engineer role.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFeedback("");
    try {
      const result = await aiEnglishCoach(values as AiEnglishCoachInput);
      setFeedback(result.feedback);
    } catch (error) {
      console.error("Error getting AI feedback:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with our AI coach. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Try our AI English Coach
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback on your writing. Paste a response to a common
            interview question like "Tell me about yourself."
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Text</CardTitle>
              <CardDescription>
                Practice your answer for an interview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your response</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Start with "I am a recent graduate with a degree in..."'
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Get Feedback"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="shadow-lg min-h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-primary" />
                AI Feedback
              </CardTitle>
              <CardDescription>
                Here&apos;s how you can improve your response.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              {isLoading && (
                <div className="flex items-center justify-center py-10 h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {feedback && (
                <div className="whitespace-pre-wrap text-sm">{feedback}</div>
              )}
              {!isLoading && !feedback && (
                <div className="text-center text-muted-foreground py-10">
                  Your feedback will appear here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
