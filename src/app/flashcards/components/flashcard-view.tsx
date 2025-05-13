'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { VocabularyWord } from '@/types';
import { WordCard } from '@/components/WordCard';

interface FlashcardViewProps {
  word: VocabularyWord;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  totalWords: number;
}

export function FlashcardView({ word, onNext, onPrevious, isFirst, isLast, currentIndex, totalWords }: FlashcardViewProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="space-y-4">
      <WordCard
        word={word}
        onReveal={handleToggleReveal}
        revealed={isRevealed}
      />
      <div className="flex justify-between w-full">
        <Button onClick={onPrevious} disabled={isFirst} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={onNext} disabled={isLast} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
