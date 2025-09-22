"use client";

import Link from "next/link";
import { Card } from "./ui/card";
import { BarChart } from "./bar-chart";
import { ReadMore } from "./read-more";
import { useReport } from "@/contexts/result-context";

export function BigFiveReport() {
  const { report } = useReport();

  if (report === null) throw new Error("BigFive Report should be provided");

  return (
    <>
      <BarChart max={120} results={report.results} />
      {/* Big Five Results */}
      <div className="space-y-6">
        {report.results.map((result) => (
          <Card key={result.domain} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold capitalize">
                  {result.title}
                </h2>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    skor: {result.score} ({result.scoreText})
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {result.shortDescription}
              </p>

              <ReadMore>
                <div
                  className="text-sm leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ __html: result.description }}
                />
              </ReadMore>

              <BarChart max={20} results={result.facets} />
              {result.facets.map((facet, index) => (
                <div key={index}>
                  <Link href={`#${facet.title}`}>
                    <h3
                      className="text-lg font-semibold capitalize"
                      id={facet.title}
                    >
                      {facet.title}
                    </h3>
                  </Link>
                  <div className="text-sm leading-relaxed text-foreground">
                    <p className="font-semibold">
                      Skor : {facet.score} ({facet.scoreText})
                    </p>
                    <p className="mt-1">{facet.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
