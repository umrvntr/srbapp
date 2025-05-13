'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearnedWords } from "@/lib/learnedWords";
import { getMomState } from "@/lib/momLogic";
import { User } from "lucide-react";

export default function ProfilePage() {
  const words = getLearnedWords();
  const momState = getMomState();
  const moodText = momState === "hungry" ? "😢 Голоден" : momState === "neutral" ? "😐 Ожидает" : "😊 Радостный";

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6 text-primary" />
            Профиль
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground">Имя</p>
              <p className="text-xl font-semibold">Аноним</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground">Выучено слов</p>
              <p className="text-xl font-semibold">{words.length}</p>
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground">Состояние Мома</p>
            <p className="text-xl font-semibold">{moodText}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 