"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Share, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { EmailModal } from "@/components/email-modal"

interface BigFiveResults {
  neuroticism: { score: number; level: string; description: string }
  extraversion: { score: number; level: string; description: string }
  openness: { score: number; level: string; description: string }
  agreeableness: { score: number; level: string; description: string }
  conscientiousness: { score: number; level: string; description: string }
}

export default function ResultsPage() {
  const [bigFiveCode, setBigFiveCode] = useState("")
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock Big Five results based on the image content
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
        "Sistem 'fight-or-flight' (bertarung atau berlari) otak seseorang yang cemas terlalu mudah dan terlalu sering digunakan. Dengan demikian, orang yang memiliki kecemasan tinggi sering merasa seperti sesuatu yang berbahaya akan terjadi. Mereka mungkin takut pada situasi tertentu atau hanya takut pada umumnya. Mereka merasa tegang, gelisah, dan gugup. Orang yang tingkat kecemasannya rendah umumnya tenang dan tidak takut.",
    },
    openness: {
      score: 10,
      level: "rendah",
      description:
        "Orang-orang yang mendapat nilai tinggi dalam Kemarahan merasa marah ketika segala sesuatunya tidak berjalan sesuai keinginan mereka. Mereka sensitif tentang diperlakukan secara adil dan merasa kesal dan pahit ketika mereka merasa dicurangi. Skala ini mengukur kecenderungan untuk merasa marah; apakah orang tersebut mengungkapkan kekesalan dan permusuhan tergantung pada tingkat Agreeableness individu tersebut. Orang yang mendapat nilai rendah tidak sering atau mudah marah.",
    },
    agreeableness: {
      score: 13,
      level: "tinggi",
      description:
        "Skala ini mengukur kecenderungan untuk merasa sedih, sedih, dan putus asa. Orang-orang yang mendapat nilai tinggi kekurangan energi dan mengalami kesulitan memulai aktivitas. Orang-orang yang mendapat nilai rendah cenderung bebas dari perasaan depresi ini.",
    },
    conscientiousness: {
      score: 11,
      level: "rendah",
      description:
        "Individu yang sadar diri sensitif tentang apa yang orang lain pikirkan tentang mereka. Kekhawatiran mereka tentang penolakan dan ejekan menyebabkan mereka merasa malu dan tidak nyaman di sekitar orang lain. Mereka mudah dan sering merasa malu. Ketakutan mereka bahwa orang lain akan mengkritik atau mengejek mereka berlebihan dan tidak realistis, tetapi kecanggungan dan ketidaknyamanan mereka mungkin membuat ketakutan ini menjadi ramalan yang terpenuhi dengan sendirinya.",
    },
  }

  useEffect(() => {
    // Get the Big Five code from localStorage
    const code = localStorage.getItem("bigFiveCode")
    if (code) {
      setBigFiveCode(code)
    }
  }, [])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(bigFiveCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "deNOVA MIND - Hasil Analisis Kepribadian",
          text: `Lihat hasil analisis kepribadian saya di deNOVA MIND. Kode: ${bigFiveCode}`,
          url: window.location.origin + "/cek-results",
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyCode()
    }
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

          {/* Tabs */}
          <Tabs defaultValue="big-five" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="big-five">Big-Five</TabsTrigger>
              <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="big-five" className="space-y-6">
              {/* Code Display and Actions */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded">
                        {bigFiveCode || "Loading..."}
                      </code>
                      <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      *Simpan kode ini untuk cek kembali hasil big-five analysis kamu
                    </p>
                  </Card>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleShare} className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Bagikan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEmailModalOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email ke saya
                  </Button>
                </div>
              </div>

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

            <TabsContent value="ai-analysis" className="space-y-6">
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Analisis AI mendalam akan tersedia setelah Anda menyelesaikan tes lengkap dengan 120 pertanyaan.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Fitur ini akan memberikan wawasan personal yang lebih komprehensif berdasarkan pola respons Anda.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} bigFiveCode={bigFiveCode} />
    </div>
  )
}
