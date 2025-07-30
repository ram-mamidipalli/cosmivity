
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function QuestionView({ question, selectedOption, onAnswerChange }: { question: any, selectedOption: string | null, onAnswerChange: (option: string) => void }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(question.comments || []);

  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: "Aakash (You)", text: newComment.trim() }]);
      setNewComment("");
    }
  };

  return (
    <Card className="glassmorphic">
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
        <CardDescription className="text-lg text-foreground">{question.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={onAnswerChange} value={selectedOption || ""}>
          {question.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center space-x-2 my-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-base">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={() => setShowExplanation(!showExplanation)} variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          {showExplanation ? "Hide" : "Show"} Answer & Explanation
        </Button>
        {showExplanation && (
          <div className="w-full p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
            <p className="font-semibold">Answer: {question.answer}</p>
            <p className="mt-2">{question.explanation}</p>
          </div>
        )}
        <Separator className="my-4" />
        <div className="w-full">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5" />
                Community Discussion
            </h3>
            <div className="space-y-4">
                {comments.map((comment: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                        <Avatar>
                            <AvatarImage data-ai-hint="person" />
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{comment.user}</p>
                            <p className="text-muted-foreground">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <Textarea 
                    placeholder="Add your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handlePostComment} className="self-end">Post Comment</Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
