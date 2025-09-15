"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: 1,
    text: "Saya merasa nyaman ketika berada di tengah keramaian dan berinteraksi dengan banyak orang.",
    category: "Extraversion",
  },
  {
    id: 2,
    text: "Saya cenderung merencanakan segala sesuatu dengan detail sebelum bertindak.",
    category: "Conscientiousness",
  },
  {
    id: 3,
    text: "Saya mudah merasa cemas atau khawatir tentang hal-hal yang mungkin terjadi di masa depan.",
    category: "Neuroticism",
  },
]

const scaleOptions = [
  { value: "1", label: "Sangat Tidak Setuju" },
  { value: "2", label: "Tidak Setuju" },
  { value: "3", label: "Netral" },
  { value: "4", label: "Setuju" },
  { value: "5", label: "Sangat Setuju" },
]

export default function TestPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const router = useRouter()

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Generate a mock Big Five code for demo purposes
    const mockCode = generateBigFiveCode()
    // Store the results in localStorage for demo
    localStorage.setItem("bigFiveCode", mockCode)
    localStorage.setItem("testAnswers", JSON.stringify(answers))
    router.push("/results")
  }

  const generateBigFiveCode = () => {
    // Generate a random 20-character alphanumeric code
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1
  const allQuestionsAnswered = questions.every((q) => answers[q.id])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Progress Bar */}
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
              <CardTitle className="text-lg lg:text-xl text-balance">{questions[currentQuestion].text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ""}
                onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
              >
                {scaleOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`q${questions[currentQuestion].id}-${option.value}`} />
                    <Label
                      htmlFor={`q${questions[currentQuestion].id}-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
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
                  disabled={!answers[questions[currentQuestion].id]}
                  className="w-full sm:w-auto"
                >
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Dapatkan Hasil
                </Button>
              )}
            </div>
          </div>

          {/* Question Overview */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? "bg-primary"
                      : answers[questions[index].id]
                        ? "bg-primary/60"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
