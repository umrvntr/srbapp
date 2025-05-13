export interface VocabularyWord {
  serbianCyrillic: string;
  serbianLatin: string;
  englishTranslation: string;
  exampleSentence: string;
  id: string; // Could be hash of the word or AI provided ID
}

export interface QuizQuestion {
  wordToTranslate: VocabularyWord; // The word that needs to be translated
  correctAnswer: string; // Correct translation (e.g., Serbian Latin or English)
  options: string[]; // Multiple choice options including the correct answer and distractors
  questionType: 'enToSr' | 'srToEn'; // Type of question: English to Serbian or Serbian to English
  targetScript?: 'cyrillic' | 'latin'; // If srToEn, which script was shown
}

export const PROFICIENCY_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type ProficiencyLevel = typeof PROFICIENCY_LEVELS[number];
