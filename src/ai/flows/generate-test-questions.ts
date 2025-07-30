'use server';

/**
 * @fileOverview A flow for generating test questions using AI.
 *
 * - generateTestQuestions - A function that generates test questions based on a topic.
 * - GenerateTestQuestionsInput - The input type for the generateTestQuestions function.
 * - GenerateTestQuestionsOutput - The return type for the generateTestQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionSchema = z.object({
    id: z.number().describe("A unique ID for the question."),
    question: z.string().describe("The question text."),
    options: z.array(z.string()).describe("An array of 4 multiple-choice options."),
    answer: z.string().describe("The correct answer from the options."),
    explanation: z.string().describe("A detailed explanation of the correct answer."),
    comments: z.array(z.object({
        user: z.string(),
        text: z.string(),
    })).optional().describe("An optional array for user comments, which should be empty by default.")
});

const GenerateTestQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate test questions.'),
  numberOfQuestions: z.number().describe('The number of questions to generate.'),
});
export type GenerateTestQuestionsInput = z.infer<typeof GenerateTestQuestionsInputSchema>;

const GenerateTestQuestionsOutputSchema = z.object({
    questions: z.array(QuestionSchema)
});
export type GenerateTestQuestionsOutput = z.infer<typeof GenerateTestQuestionsOutputSchema>;

export async function generateTestQuestions(input: GenerateTestQuestionsInput): Promise<GenerateTestQuestionsOutput> {
  const prompt = ai.definePrompt({
    name: 'generateTestQuestionsPrompt',
    input: { schema: GenerateTestQuestionsInputSchema },
    output: { schema: GenerateTestQuestionsOutputSchema },
    prompt: `You are an expert in creating aptitude tests for job preparation. Generate a list of {{numberOfQuestions}} multiple-choice questions for the topic: {{{topic}}}.

Each question must have:
- A unique ID, starting from 1.
- A clear and concise question.
- Exactly 4 options.
- A single correct answer that is one of the options.
- A detailed explanation for the correct answer.
- An empty array for comments.

Return the questions in the specified JSON format.`,
  });

  const generateTestQuestionsFlow = ai.defineFlow(
    {
      name: 'generateTestQuestionsFlow',
      inputSchema: GenerateTestQuestionsInputSchema,
      outputSchema: GenerateTestQuestionsOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return output!;
    }
  );
  
  return generateTestQuestionsFlow(input);
}
