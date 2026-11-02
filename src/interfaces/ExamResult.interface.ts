export interface ExamResult {
  id: string;
  theme: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  createdAt: string;
}
