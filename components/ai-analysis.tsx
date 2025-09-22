"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { TextEffect } from "./ui/text-effect";
import type { Analysis } from "@/lib/types/analysis-type";

export type AIAnalysisProps = {
  analyses: Analysis[];
};

export function AnalysisLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow((val) => !val);
    }, 1200);

    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <div className="w-full flex items-center justify-center text-center p-5">
      <TextEffect per="char" trigger={show}>
        Analysing Result
      </TextEffect>
    </div>
  );
}

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
