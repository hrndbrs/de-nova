"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

interface BigFiveResults {
  neuroticism: { score: number; level: string; description: string }
  extraversion: { score: number; level: string; description: string }
  openness: { score: number; level: string; description: string }
  agreeableness: { score: number; level: string; description: string }
  conscientiousness: { score: number; level: string; description: string }
}

export default function ResultsViewPage() {
  const params = useParams()
  const code = params.code as string

  // Mock Big Five results - in a real app, you'd fetch this based on the code
  const bigFiveResults: BigFiveResults = {
    neuroticism: {
      score: 17,
      level: "tinggi",
      description:
        "Nilai Anda pada Neurotisisme tinggi, yang menunjukkan bahwa Anda mudah marah, bahkan oleh apa yang kebanyakan orang anggap sebagai tuntutan hidup yang normal. Orang-orang menganggap Anda sensitif dan emosional.",
    },
    extraversion: {
      score: 15,
      level: "sedang",
      description:
        "Sistem 'fight-or-flight' (bertarung atau berlari) otak seseorang yang cemas terlalu mudah dan terlalu sering digunakan. Dengan demikian, orang yang memiliki kecemasan tinggi sering merasa seperti sesuatu yang berbahaya akan terjadi.",
    },
    openness: {
      score: 10,
      level: "rendah",
      description:
        "Orang-orang yang mendapat nilai tinggi dalam Kemarahan merasa marah ketika segala sesuatunya tidak berjalan sesuai keinginan mereka. Mereka sensitif tentang diperlakukan secara adil dan merasa kesal dan pahit ketika mereka merasa dicurangi.",
    },
    agreeableness: {
      score: 13,
      level: "tinggi",
      description:
        "Skala ini mengukur kecenderungan untuk merasa sedih, sedih, dan putus asa. Orang-orang yang mendapat nilai tinggi kekurangan energi dan mengalami kesulitan memulai aktivitas.",
    },
    conscientiousness: {
      score: 11,
      level: "rendah",
      description:
        "Individu yang sadar diri sensitif tentang apa yang orang lain pikirkan tentang mereka. Kekhawatiran mereka tentang penolakan dan ejekan menyebabkan mereka merasa malu dan tidak nyaman di sekitar orang lain.",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Analysis</h1>
            <p className="text-lg text-muted-foreground">Discover your self</p>
          </div>

          {/* Code Display */}
          <div className="text-center">
            <Card className="inline-block p-4">
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded">{code}</code>
            </Card>
          </div>

          {/* Results - Only Big Five Tab (no AI Analysis) */}
          <Tabs defaultValue="big-five" className="w-full">
            <TabsList className="grid w-full grid-cols-1 max-w-md mx-auto">
              <TabsTrigger value="big-five">Big-Five</TabsTrigger>
            </TabsList>

            <TabsContent value="big-five" className="space-y-6">
              {/* Big Five Results */}
              <div className="space-y-6">
                {Object.entries(bigFiveResults).map(([trait, data]) => (
                  <Card key={trait} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold capitalize">
                          {trait === "neuroticism"
                            ? "Neurotisisme"
                            : trait === "extraversion"
                              ? "Kegelisahan"
                              : trait === "openness"
                                ? "Kemarahan"
                                : trait === "agreeableness"
                                  ? "Depresi"
                                  : "Kesadaran Diri"}
                        </h3>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            skor: {data.score} ({data.level})
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">{data.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
