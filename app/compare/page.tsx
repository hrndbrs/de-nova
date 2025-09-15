"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useState } from "react"

interface PersonResult {
  id: string
  name: string
  code: string
  results: {
    neuroticism: number
    extraversion: number
    openness: number
    agreeableness: number
    conscientiousness: number
  }
}

export default function ComparePage() {
  const [people, setPeople] = useState<PersonResult[]>([])
  const [newPersonName, setNewPersonName] = useState("")
  const [newPersonCode, setNewPersonCode] = useState("")
  const [error, setError] = useState("")

  const generateMockResults = () => ({
    neuroticism: Math.floor(Math.random() * 20) + 1,
    extraversion: Math.floor(Math.random() * 20) + 1,
    openness: Math.floor(Math.random() * 20) + 1,
    agreeableness: Math.floor(Math.random() * 20) + 1,
    conscientiousness: Math.floor(Math.random() * 20) + 1,
  })

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPersonName.trim()) {
      setError("Silakan masukkan nama")
      return
    }

    if (!newPersonCode.trim()) {
      setError("Silakan masukkan kode Big Five")
      return
    }

    if (newPersonCode.length < 10) {
      setError("Kode tidak valid")
      return
    }

    if (people.length >= 5) {
      setError("Maksimal 5 orang dapat dibandingkan")
      return
    }

    const newPerson: PersonResult = {
      id: Date.now().toString(),
      name: newPersonName.trim(),
      code: newPersonCode.trim(),
      results: generateMockResults(),
    }

    setPeople((prev) => [...prev, newPerson])
    setNewPersonName("")
    setNewPersonCode("")
  }

  const handleRemovePerson = (id: string) => {
    setPeople((prev) => prev.filter((person) => person.id !== id))
  }

  const getScoreLevel = (score: number) => {
    if (score <= 7) return { level: "Rendah", color: "bg-blue-500" }
    if (score <= 14) return { level: "Sedang", color: "bg-yellow-500" }
    return { level: "Tinggi", color: "bg-red-500" }
  }

  const traitNames = {
    neuroticism: "Neurotisisme",
    extraversion: "Ekstraversi",
    openness: "Keterbukaan",
    agreeableness: "Keramahan",
    conscientiousness: "Kesadaran",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Bandingkan Hasil</h1>
            <p className="text-lg text-muted-foreground">
              Bandingkan hasil analisis kepribadian Big Five antara beberapa orang
            </p>
          </div>

          {/* Add Person Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Tambah Orang untuk Dibandingkan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPerson} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama"
                      value={newPersonName}
                      onChange={(e) => setNewPersonName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Kode Big Five</Label>
                    <Input
                      id="code"
                      placeholder="Masukkan kode Big Five"
                      value={newPersonCode}
                      onChange={(e) => setNewPersonCode(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={people.length >= 5}>
                  Tambah Orang ({people.length}/5)
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          {people.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Hasil Perbandingan</h2>

              {/* People Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.map((person) => (
                  <Card key={person.id} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => handleRemovePerson(person.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <code className="text-xs text-muted-foreground break-all">{person.code}</code>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(person.results).map(([trait, score]) => {
                        const { level, color } = getScoreLevel(score)
                        return (
                          <div key={trait} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {traitNames[trait as keyof typeof traitNames]}
                              </span>
                              <Badge variant="secondary" className={`${color} text-white`}>
                                {score} - {level}
                              </Badge>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${color}`}
                                style={{ width: `${(score / 20) * 100}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Chart */}
              {people.length >= 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Perbandingan Skor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(traitNames).map(([trait, traitName]) => (
                        <div key={trait} className="space-y-2">
                          <h4 className="font-medium">{traitName}</h4>
                          <div className="space-y-2">
                            {people.map((person) => {
                              const score = person.results[trait as keyof typeof person.results]
                              const { level, color } = getScoreLevel(score)
                              return (
                                <div key={person.id} className="flex items-center gap-3">
                                  <div className="w-20 text-sm truncate">{person.name}</div>
                                  <div className="flex-1 bg-muted rounded-full h-6 relative">
                                    <div
                                      className={`h-6 rounded-full ${color} flex items-center justify-end pr-2`}
                                      style={{ width: `${(score / 20) * 100}%` }}
                                    >
                                      <span className="text-xs text-white font-medium">{score}</span>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {level}
                                  </Badge>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Empty State */}
          {people.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="text-muted-foreground">
                    <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada data untuk dibandingkan</p>
                    <p className="text-sm">Tambahkan minimal 2 orang untuk mulai membandingkan hasil</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
