
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
import {Message} from 'genkit/experimental/ai';

export async function aiEnglishCoach(input: {text: string, interviewContext?: string, conversationHistory?: any[]}): Promise<{feedback: string}> {
  const AiEnglishCoachInputSchema = z.object({
    text: z
      .string()
      .describe('The text submitted by the student for English coaching.'),
    interviewContext: z.string().optional().describe("The context of the interview, if applicable."),
    conversationHistory: z.array(Message.schema).optional().describe("The history of the conversation so far."),
  });
  
  const AiEnglishCoachOutputSchema = z.object({
    feedback: z.string().describe('The personalized feedback and suggestions to improve the student\'s English proficiency.'),
  });

  const prompt = ai.definePrompt({
    name: 'aiEnglishCoachPrompt',
    input: {schema: AiEnglishCoachInputSchema},
    output: {schema: AiEnglishCoachOutputSchema},
    model: 'googleai/gemini-1.5-flash-latest',
    system: "You are an AI English coach specializing in providing personalized feedback and suggestions to students to improve their English proficiency, especially regarding interview techniques and strategies. Analyze the student's text and provide specific, actionable feedback on grammar, vocabulary, style, and clarity. If the student provided interview context, tailor the feedback towards effective communication in an interview setting. Use your knowledge of effective interview strategies to guide your feedback.",
    prompt: `{{#if conversationHistory}}
You are continuing a conversation. Here is the history:
{{#each conversationHistory}}
  {{#if (eq this.role 'user')}}
    User: {{{this.content.[0].text}}}
  {{else}}
    AI: {{{this.content.[0].text}}}
  {{/if}}
{{/each}}
{{/if}}

Latest Text from User: {{{text}}}

Interview Context: {{{interviewContext}}}`,
  });

  const aiEnglishCoachFlow = ai.defineFlow(
    {
      name: 'aiEnglishCoachFlow',
      inputSchema: AiEnglishCoachInputSchema,
      outputSchema: AiEnglishCoachOutputSchema,
    },
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );
  
  const history: GenkitMessage[] = (input.conversationHistory || []).map(msg => new GenkitMessage({
    role: msg.sender === 'user' ? 'user' : 'model',
    content: [{text: msg.text}]
  }));

  return aiEnglishCoachFlow({
    text: input.text,
    interviewContext: input.interviewContext,
    conversationHistory: history,
  });
}
