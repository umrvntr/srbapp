'use client';

import { getLearnedWords } from '@/lib/learnedWords';

export default function DictionaryPage() {
  const words = getLearnedWords();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Мой словарь</h1>
      {words.length === 0 ? (
        <p className="text-center text-muted-foreground">Пока нет выученных слов</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {words.map((word) => (
            <li key={word.id} className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-xl text-primary">{word.serbian}</strong>
                  <p className="text-muted-foreground mt-1">{word.translation_ru}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {word.transcription_ru}
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground italic">
                "{word.example_sr}"
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 