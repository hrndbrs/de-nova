import type { N8NResponse } from "./n8n-type";

export type PersonalityAnalysisResponse = N8NResponse<{
  source_id: string;
  multi_user: boolean;
  generated_at: string;
  analyses: Analysis[];
}>;

export type Analysis = {
  user_id: string;
  name: string;
  scores: Scores;
  metrics: Record<string, number>;
  sections: Section[];
  sentiment: "positive" | "neutral" | "negative" | string;
  risk_level: "low" | "medium" | "high" | string;
  confidence: number;
  categories: string[];
};

export type Scores = {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
};

export type Section = {
  title: string;
  content: SectionContent[];
};

export type SectionContent = {
  title: string;
  detail: string;
};
