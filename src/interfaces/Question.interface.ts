import { Answer, AnswerOption } from './Answer.interface';

export interface Question {
  id: string;
  theme: string;
  tabName: string;
  text: string;
  options: Answer[];
  correctOption: AnswerOption;
  sourceFile: string;
  importedAt: string;
}
