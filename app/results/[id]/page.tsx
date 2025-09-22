import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Result } from "@/components/result";
import { analyzeResults, getTestResult } from "@/lib/actions/test-action";
import { AnalysisLoader } from "@/components/ai-analysis";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getTestResult(id.substring(0, 24), "id");

  if (!report) throw new Error("Report is not found");

  const getAnalyses = analyzeResults(id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container-responsive py-8 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Analysis
            </h1>
            <p className="text-lg text-muted-foreground">Discover your self</p>
          </div>

          <Suspense fallback={<AnalysisLoader />}>
            <Result id={id} report={report} getAnalyses={getAnalyses} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
