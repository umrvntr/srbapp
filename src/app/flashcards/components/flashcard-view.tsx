'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WordCard } from '@/components/WordCard';
import Link from 'next/link';
import { addLearnedWord } from '@/lib/learnedWords';
import { useLanguage } from '@/context/LanguageContext';
import type { WordEntry } from '@/types/word';

interface FlashcardViewProps {
  word: WordEntry;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  totalWords: number;
}

export function FlashcardView({
  word,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentIndex,
  totalWords,
}: FlashcardViewProps) {
  const { language } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);

  // Reset reveal state when word changes
  useEffect(() => {
    setIsRevealed(false);
  }, [currentIndex]);

  const handleToggleReveal = useCallback((revealed: boolean) => {
    setIsRevealed(revealed);
    if (revealed) {
      addLearnedWord(word);
    }
  }, [word]);

  const t = {
    previous: language === 'ru' ? 'Назад' : 'Previous',
    next: language === 'ru' ? 'Вперёд' : 'Next',
    dictionary: language === 'ru' ? 'Мой словарь' : 'My Dictionary',
  };

  if (!word) {
    console.warn("FlashcardView: received undefined word at index", currentIndex);
    return (
      <div className="text-center text-muted-foreground p-8">
        {language === 'ru' ? 'Нет слов для отображения' : 'No words to display'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dictionary" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {t.dictionary}
          </Link>
        </Button>
      </div>

      <WordCard
        word={word}
        onReveal={handleToggleReveal}
        revealed={isRevealed}
        currentWordIndex={currentIndex}
      />

      <div className="flex justify-between w-full">
        <Button onClick={onPrevious} disabled={isFirst} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t.previous}
        </Button>
        <Button
          onClick={onNext}
          disabled={isLast}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {t.next}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}