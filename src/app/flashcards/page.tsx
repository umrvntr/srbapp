'use client';

import { useState } from 'react';
import { FlashcardView } from './components/flashcard-view';
import { wordList } from '@/data/wordList';
import type { WordEntry } from '@/types/word';
import { useLanguage } from '@/context/LanguageContext';

export default function FlashcardsPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { language } = useLanguage();
  const currentWord = wordList[currentWordIndex];

  const handleNextWord = () => {
    if (currentWordIndex < wordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">Serbian Flashcards</h1>
      
      {wordList.length > 0 ? (
        <FlashcardView
          word={currentWord}
          onNext={handleNextWord}
          onPrevious={handlePreviousWord}
          isFirst={currentWordIndex === 0}
          isLast={currentWordIndex === wordList.length - 1}
          currentIndex={currentWordIndex}
          totalWords={wordList.length}
        />
      ) : (
        <p className="text-center text-muted-foreground mt-8">
          {language === 'ru' ? 'Загрузка слов...' : 'Loading words...'}
        </p>
      )}
    </div>
  );
}
