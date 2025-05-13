'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Puzzle className="h-6 w-6 text-primary" />
            Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Здесь в будущем появится режим игры с дистракторами. Пока в разработке.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 