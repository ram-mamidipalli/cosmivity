
'use server';

/**
 * @fileOverview AI English Coach flow for providing personalized feedback and suggestions to students to improve their English proficiency, especially regarding interview techniques and strategies.
 *
 * - aiEnglishCoach - A function that handles the English coaching process.
 * - AiEnglishCoachInput - The input type for the aiEnglishCoach function.
 * - AiEnglishCoachOutput - The return type for the aiEnglishCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export async function aiEnglishCoach(input: {text: string, interviewContext?: string, conversationHistory?: any[]}): Promise<{feedback: string}> {
  const AiEnglishCoachInputSchema = z.object({
    text: z
      .string()
      .describe('The text submitted by the student for English coaching.'),
    interviewContext: z.string().optional().describe("The context of the interview, if applicable."),
    conversationHistory: z.array(z.any()).optional().describe("The history of the conversation so far."),
  });
  
  const AiEnglishCoachOutputSchema = z.object({
    feedback: z.string().describe('The personalized feedback and suggestions to improve the student\'s English proficiency.'),
  });

  const prompt = ai.definePrompt({
    name: 'aiEnglishCoachPrompt',
    input: {schema: AiEnglishCoachInputSchema},
    output: {schema: AiEnglishCoachOutputSchema},
    prompt: `You are an AI English coach specializing in providing personalized feedback and suggestions to students to improve their English proficiency, especially regarding interview techniques and strategies.

You are continuing a conversation. Here is the history:
{{#each conversationHistory}}
  {{#if (eq this.sender 'user')}}
    User: {{{this.text}}}
  {{else}}
    AI: {{{this.text}}}
  {{/if}}
{{/each}}

You will analyze the student's latest text and provide specific, actionable feedback on grammar, vocabulary, style, and clarity. If the student provided interview context, make sure to tailor the feedback towards effective communication in an interview setting. Use your knowledge of effective interview strategies to guide your feedback.

Latest Text from User: {{{text}}}

Interview Context: {{{interviewContext}}}`,
  });

  const aiEnglishCoachFlow = ai.defineFlow(
    {
      name: 'aiEnglishCoachFlow',
      inputSchema: AiEnglishCoachInputSchema,
      outputSchema: AiEnglishCoachOutputSchema,
    },
    async input => {
      const {output} = await prompt(input);
      return output!;
    }
  );
  
  return aiEnglishCoachFlow(input);
}
