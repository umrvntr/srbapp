import { useState, useEffect } from 'react';
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

export function WordCard({ word, onReveal, revealed, currentWordIndex }: WordCardProps) {
  if (!word) {
    console.warn("WordCard: received undefined word at index", currentWordIndex);
    return (
      <Card className="w-full max-w-2xl shadow-xl mx-auto p-8 text-center text-muted-foreground">
        Нет данных для отображения.
      </Card>
    );
  }

  const [showLatin, setShowLatin] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  // Reset revealed state when word changes
  useEffect(() => {
    onReveal(false);
  }, [currentWordIndex, onReveal]);

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

  const translation = language === "ru" ? word.translation_ru : word.translation_en;
  const example = language === "ru" ? word.example_ru : word.example_en;
  const pronunciation = showLatin ? word.transcription_en : word.transcription_ru;
  const serbianText = showLatin ? word.serbian_latin : word.serbian_cyrillic;

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
              onCheckedChange={setShowLatin}
              aria-label="Toggle script between Latin and Cyrillic"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-5xl font-bold text-primary mb-2" lang="sr">
            {serbianText}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(serbianText)} aria-label="Play audio">
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
        <Button onClick={() => onReveal(!revealed)} variant="outline" className="w-full">
          {revealed ? t.hideAnswer : t.showAnswer}
        </Button>
      </CardFooter>
    </Card>
  );
} 