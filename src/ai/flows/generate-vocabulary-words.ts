// src/ai/flows/generate-vocabulary-words.ts
'use server';

/**
 * @fileOverview Generates Serbian vocabulary words tailored to the user's proficiency level.
 *
 * - generateVocabularyWords - A function that generates vocabulary words.
 * - GenerateVocabularyWordsInput - The input type for the generateVocabularyWords function.
 * - GenerateVocabularyWordsOutput - The return type for the generateVocabularyWords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVocabularyWordsInputSchema = z.object({
  proficiencyLevel: z
    .string()
    .describe("The user's proficiency level (e.g., beginner, intermediate, advanced)."),
  wordCount: z
    .number()
    .describe('The number of vocabulary words to generate.')
    .default(5),
});
export type GenerateVocabularyWordsInput = z.infer<
  typeof GenerateVocabularyWordsInputSchema
>;

const VocabularyWordSchema = z.object({
  serbianCyrillic: z.string().describe('The Serbian word in Cyrillic script.'),
  serbianLatin: z.string().describe('The Serbian word in Latin script.'),
  englishTranslation: z.string().describe('The English translation of the word.'),
  exampleSentence: z.string().describe('An example sentence using the word.'),
});

const GenerateVocabularyWordsOutputSchema = z.object({
  words: z.array(VocabularyWordSchema).describe('The generated vocabulary words.'),
});
export type GenerateVocabularyWordsOutput = z.infer<
  typeof GenerateVocabularyWordsOutputSchema
>;

export async function generateVocabularyWords(
  input: GenerateVocabularyWordsInput
): Promise<GenerateVocabularyWordsOutput> {
  return generateVocabularyWordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVocabularyWordsPrompt',
  input: {schema: GenerateVocabularyWordsInputSchema},
  output: {schema: GenerateVocabularyWordsOutputSchema},
  prompt: `You are a Serbian language tutor. Generate {{wordCount}} new vocabulary words tailored to a user with {{proficiencyLevel}} proficiency.  Provide the word in Serbian Cyrillic and Latin scripts, along with the English translation and an example sentence. Respond in JSON format.

Output format: 
{
  "words": [
    {
      "serbianCyrillic": "(Serbian word in Cyrillic)",
      "serbianLatin": "(Serbian word in Latin)",
      "englishTranslation": "(English translation)",
      "exampleSentence": "(Example sentence)"
    }
  ]
}
`,
});

const generateVocabularyWordsFlow = ai.defineFlow(
  {
    name: 'generateVocabularyWordsFlow',
    inputSchema: GenerateVocabularyWordsInputSchema,
    outputSchema: GenerateVocabularyWordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
