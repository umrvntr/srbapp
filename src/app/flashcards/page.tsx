'use client';

import { useState, useEffect } from 'react';
import { WordGeneratorForm } from './components/word-generator-form';
import { FlashcardView } from './components/flashcard-view';
import { handleGenerateVocabularyWords } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import type { VocabularyWord, ProficiencyLevel } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Using Heroicons for a specific icon
import { Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function FlashcardsPage() {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateWords = async (values: { proficiencyLevel: ProficiencyLevel; wordCount: number }) => {
    setIsLoading(true);
    const result = await handleGenerateVocabularyWords(values);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error Generating Words",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.words && result.words.length > 0) {
      setWords(result.words as VocabularyWord[]); // Ensure type compatibility
      setCurrentWordIndex(0);
      toast({
        title: "Words Generated!",
        description: `${result.words.length} new words ready for learning.`,
      });
    } else {
       toast({
        title: "No Words Generated",
        description: "The AI didn't return any words. Try different parameters.",
        variant: "default",
      });
      setWords([]);
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };
  
  // Effect to pre-generate some words on initial load for demo purposes
  useEffect(() => {
    if (words.length === 0) { // Only generate if no words exist
      generateWords({ proficiencyLevel: 'beginner', wordCount: 3 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">Serbian Flashcards</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        <WordGeneratorForm onSubmit={generateWords} isLoading={isLoading} />
        
        {isLoading && words.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full max-w-2xl min-h-[400px] bg-card p-8 rounded-lg shadow-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Generating your first set of words...</p>
          </div>
        )}

        {!isLoading && words.length === 0 && (
           <Alert className="w-full max-w-2xl">
             <Info className="h-4 w-4" />
             <AlertTitle>No words loaded!</AlertTitle>
             <AlertDescription>
               Use the form to generate some vocabulary words to start learning.
             </AlertDescription>
           </Alert>
        )}

        {words.length > 0 && (
          <FlashcardView
            word={words[currentWordIndex]}
            onNext={handleNextWord}
            onPrevious={handlePreviousWord}
            isFirst={currentWordIndex === 0}
            isLast={currentWordIndex === words.length - 1}
            currentIndex={currentWordIndex}
            totalWords={words.length}
          />
        )}
      </div>
    </div>
  );
}

// Basic Heroicon component if not installed separately
const ArrowPathIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
