"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import useTimer from "@/hooks/useTimer";

import { saveTest } from "@/lib/actions/test-action";
import { useRouter } from "next/navigation";

import type { Question } from "@bigfive-org/questions";
import type { Answer } from "@/lib/types/survey-type";

export type SurveyProps = {
  questions: Question[];
};

export function Survey({ questions }: SurveyProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const seconds = useTimer();

  async function submitTest() {
    const result = await saveTest({
      testId: "b5-120",
      lang: "id",
      invalid: false,
      timeElapsed: seconds,
      dateStamp: new Date().toISOString(),
      answers,
    });

    router.push(`/results/${result.id}`);
  }

  const handleAnswerChange = (id: string, value: string) => {
    const question = questions.find((question) => question.id === id);
    if (!question) return;

    const newAnswer: Answer = {
      id,
      score: Number(value),
      domain: question.domain,
      facet: question.facet,
    };

    setAnswers((prevAnswers) => [
      ...prevAnswers.filter((a) => a.id !== id),
      newAnswer,
    ]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  const allQuestionsAnswered = answers.length === questions.length;

  return (
    <>
      {/* Progress Tracker */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Pertanyaan {currentQuestion + 1} dari {questions.length}
          </span>
          <span>{Math.round(progress)}% selesai</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl text-balance">
            {questions[currentQuestion].text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={
              answers
                .find((answer) => answer.id === questions[currentQuestion].id)
                ?.score.toString() || ""
            }
            onValueChange={(value) =>
              handleAnswerChange(questions[currentQuestion].id, value)
            }
          >
            {questions[currentQuestion].choices.map((option) => (
              <div key={option.text} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.score.toString()}
                  id={`q${questions[currentQuestion].id}-${option.text}`}
                />
                <Label
                  htmlFor={`q${questions[currentQuestion].id}-${option.text}`}
                  className="text-sm cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="w-full sm:w-auto bg-transparent"
        >
          Sebelumnya
        </Button>

        <div className="flex gap-4">
          {!isLastQuestion ? (
            <Button
              onClick={handleNext}
              disabled={
                !answers.find(
                  (answer) => answer.id === questions[currentQuestion].id,
                )
              }
              className="w-full sm:w-auto"
            >
              Selanjutnya
            </Button>
          ) : (
            <Button
              onClick={submitTest}
              disabled={!allQuestionsAnswered}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Dapatkan Hasil
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
