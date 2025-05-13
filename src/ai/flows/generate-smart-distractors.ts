'use server';

/**
 * @fileOverview Generates smart distractor words for quizzes to enhance memory retention.
 *
 * - generateSmartDistractors - A function that generates a list of distractor words for a given target word.
 * - GenerateSmartDistractorsInput - The input type for the generateSmartDistractors function.
 * - GenerateSmartDistractorsOutput - The return type for the generateSmartDistractors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartDistractorsInputSchema = z.object({
  targetWord: z.string().describe('The target word for which to generate distractors.'),
  targetWordTranslation: z.string().describe('The translation of the target word.'),
  numDistractors: z.number().describe('The number of distractor words to generate.'),
});

export type GenerateSmartDistractorsInput = z.infer<typeof GenerateSmartDistractorsInputSchema>;

const GenerateSmartDistractorsOutputSchema = z.object({
  distractors: z.array(
    z.string().describe('A list of distractor words that are similar to the target word.')
  ),
  evaluation: z
    .string()
    .optional()
    .describe('An evaluation of how effective the chosen distractors would be for enhancing the user\'s learning.'),
});

export type GenerateSmartDistractorsOutput = z.infer<typeof GenerateSmartDistractorsOutputSchema>;

export async function generateSmartDistractors(
  input: GenerateSmartDistractorsInput
): Promise<GenerateSmartDistractorsOutput> {
  return generateSmartDistractorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartDistractorsPrompt',
  input: {schema: GenerateSmartDistractorsInputSchema},
  output: {schema: GenerateSmartDistractorsOutputSchema},
  prompt: `You are an expert in language acquisition, specializing in creating effective learning materials.

  Your task is to generate a list of {{{{numDistractors}}}} distractor words for the target word "{{{{targetWord}}}}" (translation: "{{{{targetWordTranslation}}}}"). These distractors will be used in a multiple-choice quiz to help learners better understand and remember the target word through the process of elimination.

  The distractor words should be:
  - Semantically related to the target word (e.g., synonyms, antonyms, words from the same category).
  - Plausible enough to be mistaken for the correct answer by a beginner.
  - Varied in difficulty, with some being more obvious and others more subtle.

  After generating the list of distractor words, briefly evaluate how effective you believe these distractors would be for enhancing the user's learning. Consider factors such as the similarity of the distractors to the target word, the potential for confusion, and the overall challenge they pose to the learner.
  `,
});

const generateSmartDistractorsFlow = ai.defineFlow(
  {
    name: 'generateSmartDistractorsFlow',
    inputSchema: GenerateSmartDistractorsInputSchema,
    outputSchema: GenerateSmartDistractorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
