"use client";

import { Card } from "./ui/card";
import type { Analysis } from "@/lib/types/analysis-type";

export type AIAnalysisProps = {
  analyses: Analysis[];
};
export function AIAnalysis({ analyses }: AIAnalysisProps) {
  console.log(analyses, 2123);
  return (
    <div className="space-y-6">
      {analyses[0].sections.map((section) => (
        <Card className="p-6" key={section.title}>
          <div className="space-y-4">
            <h3 className="text-center text-xl font-semibold">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.content.map((content) => (
                <li key={content.title} className="space-y-0.5">
                  <h4 className="font-semibold">{content.title}</h4>
                  <p className="text-muted-foreground">{content.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}
