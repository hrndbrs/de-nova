import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const founders = [
  {
    name: "Dr. Sarah Wijaya",
    role: "CEO & Co-Founder",
    background: "Psikolog Klinis dengan 15+ tahun pengalaman dalam assessment kepribadian",
  },
  {
    name: "Ahmad Rizki",
    role: "CTO & Co-Founder",
    background: "AI Engineer dengan spesialisasi dalam Natural Language Processing dan Machine Learning",
  },
  {
    name: "Maya Sari",
    role: "Head of Research & Co-Founder",
    background: "Peneliti Psikologi dengan fokus pada Big Five personality model dan psychometrics",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Tentang Kami</h1>
            <p className="text-lg text-muted-foreground">Mengenal lebih dekat deNOVA MIND</p>
          </div>

          {/* Company Description */}
          <Card>
            <CardHeader>
              <CardTitle>Deskripsi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                deNOVA MIND adalah platform assessment kepribadian berbasis AI yang menggunakan model psikologi Big Five
                untuk membantu individu memahami diri mereka dengan lebih baik. Kami menggabungkan riset psikologi
                terdepan dengan teknologi artificial intelligence untuk memberikan analisis kepribadian yang akurat dan
                bermakna.
              </p>
              <p className="leading-relaxed">
                Platform kami dirancang untuk memberikan wawasan mendalam tentang pola perilaku, preferensi, dan
                karakteristik kepribadian yang dapat membantu dalam pengembangan diri, karir, dan hubungan
                interpersonal.
              </p>
            </CardContent>
          </Card>

          {/* Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Tujuan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Membantu setiap individu untuk mengenal, memahami, dan mengembangkan potensi diri mereka melalui
                assessment kepribadian yang ilmiah, akurat, dan mudah diakses. Kami percaya bahwa pemahaman diri yang
                mendalam adalah kunci untuk mencapai kesuksesan dan kebahagiaan dalam hidup.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card>
            <CardHeader>
              <CardTitle>Visi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Menjadi platform assessment kepribadian terdepan di Indonesia yang memberdayakan jutaan orang untuk
                memahami diri mereka dengan lebih baik dan mencapai potensi penuh mereka dalam kehidupan personal dan
                profesional.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle>Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  Menyediakan assessment kepribadian yang akurat dan berbasis riset ilmiah menggunakan model Big Five
                </li>
                <li>Mengintegrasikan teknologi AI untuk memberikan analisis yang personal dan mendalam</li>
                <li>Membuat assessment kepribadian mudah diakses dan dipahami oleh semua kalangan</li>
                <li>Mendukung pengembangan diri berkelanjutan melalui wawasan kepribadian yang actionable</li>
                <li>Membangun komunitas yang mendukung pertumbuhan dan pemahaman diri</li>
              </ul>
            </CardContent>
          </Card>

          {/* Development Stage */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Status Pengembangan</h3>
                <p className="text-muted-foreground">
                  Kami saat ini berada dalam tahap <strong>prototyping dan research</strong>. Platform ini terus
                  dikembangkan dengan masukan dari pengguna dan penelitian terbaru dalam bidang psikologi dan AI.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Founders */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Tim Pendiri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{founder.name}</CardTitle>
                    <p className="text-sm text-primary font-medium">{founder.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">{founder.background}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
