import { WordEntry } from "@/types/word";

const STORAGE_KEY = "learnedWords";

export function getLearnedWords(): WordEntry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addLearnedWord(word: WordEntry): void {
  if (typeof window === 'undefined') return;
  const current = getLearnedWords();
  const exists = current.some(w => w.serbian === word.serbian);
  if (!exists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, word]));
  }
} 