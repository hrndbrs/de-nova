import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CaveatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left side - Branding */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">deNOVA</h1>
              <p className="text-lg text-muted-foreground">Discover your self</p>
            </div>
          </div>

          {/* Right side - Terms Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">Sebelum memulai</h2>

              <div className="space-y-6 text-sm leading-relaxed text-foreground">
                <p>
                  Penilaian ini dirancang untuk membantu mengenali pola kepribadian berdasarkan model psikologi Big Five
                  — sebuah pendekatan ilmiah yang telah terbukti dan digunakan secara luas dalam bidang psikologi
                  modern. Namun, penting untuk dipahami bahwa:
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">1. Ini Bukan Label, Ini Cermin</p>
                    <div className="pl-4 space-y-2 text-muted-foreground">
                      <p>a. Hasil yang kamu dapat bukanlah "cap" atau identitas mutlak.</p>
                      <p>
                        b. Ini adalah refleksi dari bagaimana kamu merespons saat ini — dalam konteks tertentu, pada
                        waktu tertentu.
                      </p>
                      <p>
                        c. Kepribadian bersifat dinamis dan dapat berkembang seiring waktu, pengalaman, dan kesadaran
                        diri.
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">2. Tujuan Utama Asesmen Ini</p>
                    <div className="pl-4 space-y-2 text-muted-foreground">
                      <p>a. Memberikan kamu pemahaman awal tentang pola perilaku, preferensi, dan cara berpikirmu.</p>
                      <p>
                        b. Membuka ruang untuk refleksi dan percakapan internal — mengenali kekuatan, tantangan, dan
                        potensi pertumbuhan.
                      </p>
                      <p>c. Menjadi dasar untuk eksplorasi lebih lanjut, bukan jawaban final.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Gunakan Hasil Ini Sebagai:</p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Kompas, bukan peta final.</li>
                    <li>Pintu masuk ke perjalanan pengembangan diri — bukan tujuan akhir.</li>
                    <li>Alat bantu untuk memperjelas arah, bukan untuk membatasi dirimu.</li>
                  </ul>
                </div>

                <p>Kami percaya bahwa setiap orang punya kapasitas untuk berubah dan berkembang.</p>

                <p>
                  Hasil ini adalah awal dari percakapanmu dengan diri sendiri, dan NOVA hadir untuk menemanimu dalam
                  proses itu — dengan wawasan, teknologi, dan empati.
                </p>

                <p className="font-medium">
                  Selamat mengeksplorasi dirimu. Ini bukan tentang benar atau salah. Ini tentang mengenal, menerima, dan
                  bertumbuh.
                </p>
              </div>
            </div>

            <Link href="/test">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                Okay, Saya Mengerti
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
