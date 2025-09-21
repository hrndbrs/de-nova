import { Navigation } from "@/components/navigation";
import { Survey } from "@/components/survey";
import { getItems } from "@bigfive-org/questions";
import { shuffleArray } from "@/lib/helpers/array";

export default function TestPage() {
  const questions = shuffleArray(getItems("id"));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <Survey questions={questions} />
        </div>
      </main>
    </div>
  );
}
