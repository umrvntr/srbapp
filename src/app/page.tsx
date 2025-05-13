'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t.navDashboard}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {language === "ru" 
              ? "Здесь в будущем появится информация о Теодоре, уроках, видео и сторис."
              : "Information about Theodore, lessons, videos, and stories will appear here in the future."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
