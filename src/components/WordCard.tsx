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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

  const handlePlayAudio = useCallback((text: string, lang: string = 'sr-RS') => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesisRef.current.speak(utterance);
    }
  }, []);

  const handleReveal = useCallback(() => {
    onReveal(!revealed);
  }, [onReveal, revealed]);

  const handleScriptToggle = useCallback((checked: boolean) => {
    setShowLatin(checked);
  }, []);

  const { serbianText, pronunciation, translation, example } = useMemo(() => ({
    serbianText: showLatin ? word?.serbian_latin : word?.serbian_cyrillic,
    pronunciation: showLatin ? word?.transcription_en : word?.transcription_ru,
    translation: language === 'ru' ? word?.translation_ru : word?.translation_en,
    example: language === 'ru' ? word?.example_ru : word?.example_en
  }), [word, showLatin, language]);

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

      <CardContent className="p-6 text-center space-y-6">
        {/* ГЛАВНОЕ СЛОВО — большое, жирное, в стиле flashcards */}
        <div className="text-center">
          <div className="text-[64px] leading-tight font-extrabold tracking-wide">
            {serbianText}
          </div>
          <Button variant="ghost" className="mt-2" onClick={() => handlePlayAudio(serbianText)}>
            <Volume2 className="h-6 w-6" />
          </Button>
        </div>

        {/* ТРАНСКРИПЦИЯ */}
        {pronunciation && (
          <div className="text-muted-foreground italic text-lg">
            [{pronunciation}]
          </div>
        )}

        <Separator />

        {/* ПЕРЕВОД и ПРИМЕР — только если открыт ответ */}
        {revealed ? (
          <>
            <div className="text-xl">{translation}</div>
            <div className="text-sm text-muted-foreground">{example}</div>
          </>
        ) : (
          <div className="text-muted-foreground italic text-base">
            {t.prompt}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center py-4">
        <Button onClick={handleReveal} variant="secondary">
          {revealed ? t.hideAnswer : t.showAnswer}
        </Button>
      </CardFooter>
    </Card>
  );
});