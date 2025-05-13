'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react'; // Icons for feedback
import type { QuizQuestion } from '@/types';

interface QuizViewProps {
  question: QuizQuestion;
  onAnswer: (selectedAnswer: string, correctAnswer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  onNextQuestion: () => void;
}

export function QuizView({ question, onAnswer, questionNumber, totalQuestions, isLastQuestion, onNextQuestion }: QuizViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Null means not yet answered
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Initially hide correct answer

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
      const correct = selectedAnswer === question.correctAnswer;
      setIsCorrect(correct);
      onAnswer(selectedAnswer, question.correctAnswer);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // You might want to navigate to a results page or reset the quiz here
      alert("End of quiz!"); // Placeholder
    } else {
      onNextQuestion();
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setShowCorrectAnswer(false); // Reset state for the next question
    }
  };

  const handleShowAnswer = () => {
    setShowCorrectAnswer(true);
  };

  // Effect to reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
  }, [question]);

  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-secondary-foreground">
            Question {questionNumber} / {totalQuestions}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <p className="text-xl text-muted-foreground">Translate this word:</p>
          <h2 className="text-4xl font-bold text-primary mb-2" lang="sr">
            {question.wordToTranslate.serbianLatin} {/* Always show in Latin for this quiz type */}
          </h2>
        </div>

        <RadioGroup onValueChange={handleAnswerSelection} value={selectedAnswer || undefined} disabled={isAnswered}>
          {question.options.map((option, index) => (
            <div key={index} className="mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} className="peer sr-only" />
              <Label
                htmlFor={`option-${index}`}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground rounded-md flex items-center p-4 border border-secondary cursor-pointer peer-data-[state=checked]:border-primary"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 p-4 bg-secondary rounded-b-lg">
        {!isAnswered ? (
          <div className="flex justify-between w-full">
            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit Answer
            </Button>
            <Button variant="ghost" onClick={handleShowAnswer}>
              Show Answer <HelpCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            {isCorrect ? (
              <span className="text-green-500 font-semibold">
                <CheckCircle className="mr-2 h-5 w-5 inline-block" /> Correct!
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                <XCircle className="mr-2 h-5 w-5 inline-block" /> Incorrect.
              </span>
            )}

            <Button onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        )}

        {showCorrectAnswer && (
          <div className="mt-4 p-4 rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">
              Correct Answer: <span className="font-semibold">{question.correctAnswer}</span>
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
