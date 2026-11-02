export type AnswerOption = 'A' | 'B' | 'C' | 'D';

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  option: AnswerOption;
  isCorrect: boolean;
}
