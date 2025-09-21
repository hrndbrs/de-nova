export type N8NResponse<T> = {
  data: T | N8NPayloadError;
};

export type N8NPayloadError = {
  skip: boolean;
  reason: string;
  source_id: string;
};

export type N8NBaseError = {
  code: number;
  message: string;
  hint: string;
};
