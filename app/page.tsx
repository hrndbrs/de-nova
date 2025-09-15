import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="container-responsive py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Branding */}
            <div className="flex-1 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground">deNOVA</h1>
                <p className="text-lg text-muted-foreground">Our Mission</p>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground">
                  Ini bukan sekadar tes kepribadian — ini adalah awal dari perjalananmu untuk menjadi versi terbaik dari
                  dirimu.
                </p>
                <p className="text-base leading-relaxed text-foreground">
                  Tes berikut berisi 120 soal yang diperkirakan membutuhkan waktu sekitar 10 menit untuk diselesaikan.
                </p>
              </div>

              <Link href="/caveat">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  Mulai Penilaian
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
