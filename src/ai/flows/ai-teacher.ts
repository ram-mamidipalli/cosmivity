
'use server';

/**
 * @fileOverview An AI Teacher flow for answering student questions and doubts.
 *
 * - aiTeacher - A function that handles the teaching process.
 * - AiTeacherInput - The input type for the aiTeacher function.
 * - AiTeacherOutput - The return type for the aiTeacher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTeacherInputSchema = z.object({
  query: z.string().describe('The question or doubt from the student.'),
  conversationHistory: z.array(z.any()).optional().describe("The history of the conversation so far."),
});
export type AiTeacherInput = z.infer<typeof AiTeacherInputSchema>;

const AiTeacherOutputSchema = z.object({
  response: z.string().describe('The AI teacher\'s response to the student\'s query.'),
});
export type AiTeacherOutput = z.infer<typeof AiTeacherOutputSchema>;

const prompt = ai.definePrompt({
  name: 'aiTeacherPrompt',
  input: { schema: AiTeacherInputSchema },
  output: { schema: AiTeacherOutputSchema },
  prompt: `You are an expert AI Teacher. Your goal is to help students by answering their questions and clearing their doubts on any topic. Provide clear, concise, and helpful explanations.

You are continuing a conversation. Here is the history:
{{#each conversationHistory}}
  {{#if (eq this.sender 'user')}}
    User: {{{this.text}}}
  {{else}}
    AI: {{{this.text}}}
  {{/if}}
{{/each}}

Student's latest query: {{{query}}}

Provide your response as an expert teacher.`,
});

const aiTeacherFlow = ai.defineFlow(
  {
    name: 'aiTeacherFlow',
    inputSchema: AiTeacherInputSchema,
    outputSchema: AiTeacherOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
  
export async function aiTeacher(input: AiTeacherInput): Promise<AiTeacherOutput> {
  return aiTeacherFlow(input);
}
