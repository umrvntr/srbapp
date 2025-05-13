'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLearnedWords } from "@/lib/learnedWords";
import { getMomState } from "@/lib/momLogic";
import { User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ProfilePage() {
  const words = getLearnedWords();
  const momState = getMomState();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const moodText = momState === "hungry" 
    ? language === "ru" ? "😢 Голоден" : "😢 Hungry"
    : momState === "neutral" 
    ? language === "ru" ? "😐 Ожидает" : "😐 Neutral"
    : language === "ru" ? "😊 Радостный" : "😊 Happy";

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6 text-primary" />
            {t.profileTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground">{t.nameLabel}</p>
              <p className="text-xl font-semibold">Anonymous</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground">{t.learnedLabel}</p>
              <p className="text-xl font-semibold">{words.length}</p>
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground">{t.momStateLabel}</p>
            <p className="text-xl font-semibold">{moodText}</p>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground">{t.languageLabel}</p>
            <div className="flex gap-2 mt-2">
              <Button 
                variant={language === "ru" ? "default" : "outline"}
                onClick={() => setLanguage("ru")}
              >
                {t.switchToRu}
              </Button>
              <Button 
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
              >
                {t.switchToEn}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 