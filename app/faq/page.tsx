import { Navigation } from "@/components/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Apa itu model Big Five dalam psikologi?",
    answer:
      "Model Big Five adalah kerangka kerja psikologi yang mengidentifikasi lima dimensi utama kepribadian: Openness (Keterbukaan), Conscientiousness (Kesadaran), Extraversion (Ekstraversi), Agreeableness (Keramahan), dan Neuroticism (Neurotisisme). Model ini telah terbukti secara ilmiah dan digunakan secara luas dalam penelitian psikologi.",
  },
  {
    question: "Seberapa akurat hasil assessment deNOVA MIND?",
    answer:
      "Assessment kami didasarkan pada model Big Five yang telah teruji secara ilmiah. Namun, penting untuk diingat bahwa hasil ini adalah gambaran umum kepribadian Anda pada saat pengambilan tes. Kepribadian dapat berkembang seiring waktu, dan hasil ini sebaiknya digunakan sebagai panduan untuk refleksi diri, bukan sebagai label yang mutlak.",
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan tes?",
    answer:
      "Tes lengkap terdiri dari 120 pertanyaan dan biasanya membutuhkan waktu sekitar 10-15 menit untuk diselesaikan. Kami menyarankan untuk mengerjakan tes dalam kondisi yang tenang dan tidak terburu-buru untuk mendapatkan hasil yang lebih akurat.",
  },
  {
    question: "Apakah data pribadi saya aman?",
    answer:
      "Ya, keamanan data Anda adalah prioritas utama kami. Semua data pribadi dan hasil tes dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda.",
  },
  {
    question: "Bisakah saya mengulang tes di kemudian hari?",
    answer:
      "Tentu saja! Anda dapat mengulang tes kapan saja. Bahkan, kami merekomendasikan untuk mengulang tes setiap 6-12 bulan untuk melihat perkembangan kepribadian Anda. Setiap hasil tes akan memiliki kode unik yang dapat Anda simpan untuk referensi di masa depan.",
  },
  {
    question: "Apa perbedaan antara analisis Big Five dan AI Analysis?",
    answer:
      "Analisis Big Five memberikan skor dan interpretasi berdasarkan lima dimensi kepribadian standar. Sementara AI Analysis menggunakan kecerdasan buatan untuk memberikan wawasan yang lebih personal dan kontekstual berdasarkan pola respons Anda, termasuk rekomendasi pengembangan diri yang spesifik.",
  },
  {
    question: "Bagaimana cara menggunakan kode Big Five untuk cek hasil?",
    answer:
      "Setelah menyelesaikan tes, Anda akan mendapatkan kode unik yang terdiri dari 20 karakter alfanumerik. Simpan kode ini dengan baik. Untuk melihat hasil di kemudian hari, masuk ke halaman 'Cek Results' dan masukkan kode tersebut. Kode ini juga dapat dibagikan kepada orang lain jika Anda ingin membandingkan hasil.",
  },
  {
    question: "Apakah tes ini cocok untuk semua usia?",
    answer:
      "Tes ini dirancang untuk dewasa (18 tahun ke atas). Untuk remaja di bawah 18 tahun, kami menyarankan untuk melakukan tes dengan pendampingan orang tua atau konselor, karena kepribadian pada usia tersebut masih dalam tahap perkembangan.",
  },
  {
    question: "Bagaimana cara membandingkan hasil dengan orang lain?",
    answer:
      "Anda dapat menggunakan fitur 'Bandingkan' untuk membandingkan hasil Big Five Anda dengan hingga 4 orang lain. Cukup masukkan nama dan kode Big Five masing-masing orang. Fitur ini berguna untuk memahami dinamika tim, pasangan, atau keluarga.",
  },
  {
    question: "Apakah deNOVA MIND dapat digunakan untuk rekrutmen atau seleksi karyawan?",
    answer:
      "Meskipun hasil tes dapat memberikan wawasan tentang kepribadian kandidat, kami menyarankan untuk tidak menggunakan hasil ini sebagai satu-satunya kriteria dalam proses rekrutmen. Assessment kepribadian sebaiknya digunakan sebagai salah satu pertimbangan, bukan penentu utama, dalam pengambilan keputusan HR.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">Pertanyaan yang sering diajukan tentang deNOVA MIND</p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Info */}
          <div className="text-center pt-8 border-t">
            <p className="text-muted-foreground">
              Masih ada pertanyaan? Hubungi kami di{" "}
              <a href="mailto:support@denovamind.com" className="text-primary hover:underline">
                support@denovamind.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
