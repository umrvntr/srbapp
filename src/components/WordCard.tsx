import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Volume2 } from 'lucide-react';
import type { WordEntry } from '@/types/word';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface WordCardProps {
  word: WordEntry;
  onReveal: (revealed: boolean) => void;
  revealed: boolean;
  currentWordIndex: number;
}

// Memoize the component to prevent unnecessary re-renders
export const WordCard = React.memo(function WordCard({ 
  word, 
  onReveal, 
  revealed, 
  currentWordIndex 
}: WordCardProps) {
  const [showLatin, setShowLatin] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const isInitialMount = useRef(true);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Memoize the audio handler with proper cleanup
  const handlePlayAudio = useCallback((text: string, lang: string = 'sr-RS') => {
    if (speechSynthesisRef.current) {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesisRef.current.speak(utterance);
    } else {
      console.warn('Text-to-speech is not supported in your browser.');
    }
  }, []);

  // Memoize the reveal handler
  const handleReveal = useCallback(() => {
    onReveal(!revealed);
  }, [onReveal, revealed]);

  // Memoize the script toggle handler
  const handleScriptToggle = useCallback((checked: boolean) => {
    setShowLatin(checked);
  }, []);

  // Memoize derived values only if they're used in multiple places
  const { serbianText, pronunciation, translation, example } = useMemo(() => ({
    serbianText: showLatin ? word?.serbian_latin : word?.serbian_cyrillic,
    pronunciation: showLatin ? word?.transcription_en : word?.transcription_ru,
    translation: language === 'ru' ? word?.translation_ru : word?.translation_en,
    example: language === 'ru' ? word?.example_ru : word?.example_en
  }), [word, showLatin, language]);

  // Early return for missing word
  if (!word) {
    console.warn("WordCard: received undefined word at index", currentWordIndex);
    return (
      <Card className="w-full max-w-2xl shadow-xl mx-auto p-8 text-center text-muted-foreground">
        {language === 'ru' ? 'Нет данных для отображения.' : 'No data to display.'}
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-secondary-foreground">
            {t.cardTitle}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="script-toggle" className="text-sm text-secondary-foreground">
              {showLatin ? t.latin : t.cyrillic}
            </Label>
            <Switch
              id="script-toggle"
              checked={showLatin}
              onCheckedChange={handleScriptToggle}
              aria-label="Toggle script display"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-5xl font-bold text-primary mb-2" lang="sr">
            {serbianText}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handlePlayAudio(serbianText)} 
            aria-label="Play audio"
          >
            <Volume2 className="h-6 w-6 text-muted-foreground" />
          </Button>
        </div>

        {revealed ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="text-2xl text-foreground">
              {translation}
            </p>
            <Separator />
            <div className="space-y-2">
              <p className="text-md text-muted-foreground italic" lang="sr">
                "{word.example_sr}"
              </p>
              <p className="text-md text-muted-foreground italic">
                "{example}"
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {pronunciation}
            </div>
          </div>
        ) : (
          <p className="text-xl text-muted-foreground">
            {t.prompt}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleReveal} 
          variant="outline" 
          className="w-full"
        >
          {revealed ? t.hideAnswer : t.showAnswer}
        </Button>
      </CardFooter>
    </Card>
  );
});
