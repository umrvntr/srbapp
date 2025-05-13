'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WordEntry } from '@/types/word';
import { WordCard } from '@/components/WordCard';
import Link from 'next/link';
import { addLearnedWord } from '@/lib/learnedWords';
import { useLanguage } from '@/context/LanguageContext';

interface FlashcardViewProps {
  word: WordEntry;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  totalWords: number;
}

export function FlashcardView({ word, onNext, onPrevious, isFirst, isLast, currentIndex, totalWords }: FlashcardViewProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { language } = useLanguage();

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
    if (!isRevealed) {
      addLearnedWord(word);
    }
  };

  const translations = {
    previous: language === 'ru' ? 'Назад' : 'Previous',
    next: language === 'ru' ? 'Вперед' : 'Next',
    dictionary: language === 'ru' ? 'Мой словарь' : 'My Dictionary'
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dictionary" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {translations.dictionary}
          </Link>
        </Button>
      </div>
      <WordCard
        word={word}
        onReveal={handleToggleReveal}
        revealed={isRevealed}
      />
      <div className="flex justify-between w-full">
        <Button onClick={onPrevious} disabled={isFirst} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> {translations.previous}
        </Button>
        <Button onClick={onNext} disabled={isLast} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {translations.next} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
