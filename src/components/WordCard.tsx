import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Volume2 } from 'lucide-react';
import type { WordEntry } from '@/types/word';
import { useLanguage } from '@/context/LanguageContext';

interface WordCardProps {
  word: WordEntry;
  onReveal: () => void;
  revealed: boolean;
}

export function WordCard({ word, onReveal, revealed }: WordCardProps) {
  const [showLatin, setShowLatin] = useState(true);
  const { language } = useLanguage();

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

  const translations = {
    title: language === 'ru' ? 'Карточка слова' : 'Word Card',
    reveal: language === 'ru' ? 'Показать' : 'Reveal',
    hide: language === 'ru' ? 'Скрыть' : 'Hide',
    answer: language === 'ru' ? 'ответ' : 'Answer',
    clickToReveal: language === 'ru' ? 'Нажмите, чтобы увидеть перевод и пример.' : 'Click to reveal translation and example.'
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-secondary-foreground">
            {translations.title}
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
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-5xl font-bold text-primary mb-2" lang="sr">
            {word.serbian}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(word.serbian)} aria-label="Play audio">
            <Volume2 className="h-6 w-6 text-muted-foreground" />
          </Button>
        </div>

        {revealed ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="text-2xl text-foreground">
              {language === 'ru' ? word.translation_ru : word.translation_en}
            </p>
            <Separator />
            <div className="space-y-2">
              <p className="text-md text-muted-foreground italic" lang="sr">
                "{word.example_sr}"
              </p>
              <p className="text-md text-muted-foreground italic">
                "{language === 'ru' ? word.example_ru : word.example_en}"
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'ru' ? word.transcription_ru : word.transcription_en}
            </div>
          </div>
        ) : (
          <p className="text-xl text-muted-foreground">
            {translations.clickToReveal}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onReveal} variant="outline" className="w-full">
          {revealed ? translations.hide : translations.reveal} {translations.answer}
        </Button>
      </CardFooter>
    </Card>
  );
} 