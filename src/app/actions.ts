'use server';

import { generateVocabularyWords, type GenerateVocabularyWordsInput, type GenerateVocabularyWordsOutput } from '@/ai/flows/generate-vocabulary-words';
import { generateSmartDistractors, type GenerateSmartDistractorsInput, type GenerateSmartDistractorsOutput } from '@/ai/flows/generate-smart-distractors';
import type { VocabularyWord } from '@/types';

export async function handleGenerateVocabularyWords(input: GenerateVocabularyWordsInput): Promise<GenerateVocabularyWordsOutput | { error: string }> {
  try {
    const result = await generateVocabularyWords(input);
    // Add a unique ID to each word if not provided by AI (simple hash for now)
    // In a real app, this ID should be more robust or come from a database
    const wordsWithIds = result.words.map(word => ({
      ...word,
      id: Math.random().toString(36).substring(2, 15) // simple unique id
    }));
    return { ...result, words: wordsWithIds as VocabularyWord[] };
  } catch (error) {
    console.error("Error generating vocabulary words:", error);
    return { error: "Failed to generate vocabulary words. Please try again." };
  }
}

export async function handleGenerateSmartDistractors(input: GenerateSmartDistractorsInput): Promise<GenerateSmartDistractorsOutput | { error: string }> {
  try {
    const result = await generateSmartDistractors(input);
    return result;
  } catch (error) {
    console.error("Error generating smart distractors:", error);
    return { error: "Failed to generate distractors. Please try again." };
  }
}
