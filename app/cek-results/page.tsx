"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CekResultsPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code.trim()) {
      setError("Silakan masukkan kode Big Five Anda")
      return
    }

    if (code.length < 10) {
      setError("Kode tidak valid. Pastikan Anda memasukkan kode yang benar")
      return
    }

    // Store the code and redirect to results page
    localStorage.setItem("bigFiveCode", code)
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Branding */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">deNOVA</h1>
              <p className="text-lg text-muted-foreground">Discover your self</p>
            </div>
          </div>

          {/* Right side - Code Input */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">Masukan kode</h2>

              <p className="text-base leading-relaxed text-foreground">
                Kodenya ada di akhir results, kamu hanya perlu paste aja
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="9I8jodxn8IJ29dnI9ujadnIuI12jejIi"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full text-center font-mono"
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Submit
                </Button>
              </form>
            </div>

            {/* Info Card */}
            <Card className="p-4 bg-muted/50">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Tidak punya kode?</h3>
                <p className="text-sm text-muted-foreground">
                  Ambil tes kepribadian terlebih dahulu untuk mendapatkan kode Big Five Anda.
                </p>
                <Button variant="outline" size="sm" onClick={() => router.push("/")} className="bg-transparent">
                  Mulai Tes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
