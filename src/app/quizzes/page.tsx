'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function QuizzesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Puzzle className="h-6 w-6 text-primary" />
            {t.navQuizzes}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            {t.inProgress}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 