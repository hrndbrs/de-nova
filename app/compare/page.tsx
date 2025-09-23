import { ComparePeople } from "@/components/compare-people";
import { Navigation } from "@/components/navigation";
import { Suspense } from "react";

interface Props {
  params: { locale: string };
  searchParams: { id: string };
}

export default function ComparePage({ searchParams: { id } }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16 space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Bandingkan orang atau tim
        </h1>
        <p className="text-lg text-muted-foreground">
          Bandingkan hasil tes kepribadian BigFive dengan banyak orang.
        </p>
        <Suspense fallback="loading...">
          <ComparePeople paramId={id} />
        </Suspense>
      </main>
    </div>
  );
}
