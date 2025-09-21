import type { Domain, Language } from "@bigfive-org/results";

export type BaseAnswer = {
  score: number;
  domain: string;
  facet: number;
};

export type Answer = BaseAnswer & { id: string };

export type DbResult = {
  testId: string;
  lang: string;
  invalid: boolean;
  timeElapsed: number;
  dateStamp: string;
  answers: Answer[];
};

export type Feedback = {
  name: string;
  email: string;
  message: string;
};

type ErrorName = "NotFoundError" | "SavingError";

class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: T;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export class B5Error extends ErrorBase<ErrorName> { }

export type Report = {
  id: string;
  timestamp: number;
  availableLanguages: Language[];
  language: string;
  results: Domain[];
};
