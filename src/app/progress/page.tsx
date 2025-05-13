'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMomState, updateMomVisit } from "@/lib/momLogic";
import { getLearnedWords } from "@/lib/learnedWords";

export default function ProgressPage() {
  const words = getLearnedWords();
  const state = getMomState();
  const moodEmoji = state === "hungry" ? "😢" : state === "neutral" ? "😐" : "😊";
  const moodText = state === "hungry" ? "Мом голоден..." : state === "neutral" ? "Мом ждёт тебя" : "Мом рад тебя видеть!";

  useEffect(() => {
    updateMomVisit();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Прогресс обучения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-secondary rounded-lg">
            <div className="text-6xl mb-4">{moodEmoji}</div>
            <p className="text-xl text-secondary-foreground">{moodText}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">{words.length}</div>
                <p className="text-muted-foreground">Выучено слов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {Math.round((words.length / 100) * 100)}%
                </div>
                <p className="text-muted-foreground">Прогресс</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 