export enum AnswerStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Answer {
  challenge_id: number;
  status: AnswerStatus;
  answer?: string;
  tested?: boolean;
}
