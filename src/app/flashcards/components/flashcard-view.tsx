'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { VocabularyWord } from '@/types';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

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
  const [showLatin, setShowLatin] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
  };
  
  // Placeholder for text-to-speech
  const handlePlayAudio = (text: string, lang: string = 'sr-RS') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };


  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-secondary-foreground">
            Flashcard {currentIndex + 1} / {totalWords}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="script-toggle" className="text-sm text-secondary-foreground">
              {showLatin ? 'Latin' : 'Cyrillic'}
            </Label>
            <Switch
              id="script-toggle"
              checked={showLatin}
              onCheckedChange={setShowLatin}
              aria-label="Toggle script between Latin and Cyrillic"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 text-center min-h-[250px] flex flex-col justify-center items-center">
        <div className="mb-6">
          <h2 className="text-5xl font-bold text-primary mb-2" lang="sr">
            {showLatin ? word.serbianLatin : word.serbianCyrillic}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(showLatin ? word.serbianLatin : word.serbianCyrillic)} aria-label="Play audio">
            <Volume2 className="h-6 w-6 text-muted-foreground" />
          </Button>
        </div>

        {isRevealed ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="text-2xl text-foreground">{word.englishTranslation}</p>
            <Separator />
            <p className="text-md text-muted-foreground italic" lang="sr">
              "{word.exampleSentence}"
            </p>
          </div>
        ) : (
          <p className="text-xl text-muted-foreground">Click to reveal translation and example.</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-4 bg-secondary rounded-b-lg">
        <Button onClick={handleToggleReveal} variant="outline" className="w-full">
          {isRevealed ? 'Hide' : 'Reveal'} Answer
        </Button>
        <div className="flex justify-between w-full">
          <Button onClick={onPrevious} disabled={isFirst} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={onNext} disabled={isLast} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {/* Placeholder for future "Mark as learned/difficult" */}
        {/* <div className="flex justify-center gap-4 mt-2 w-full">
            <Button variant="ghost" className="text-green-500 hover:bg-green-100">
                <CheckCircle className="mr-2 h-5 w-5" /> Mark as Learned
            </Button>
            <Button variant="ghost" className="text-red-500 hover:bg-red-100">
                <XCircle className="mr-2 h-5 w-5" /> Mark as Difficult
            </Button>
        </div> */}
      </CardFooter>
    </Card>
  );
}
