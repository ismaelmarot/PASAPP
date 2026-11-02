import { useState, useCallback } from 'react';
import { pdfService } from '@/services';

type SimulatorState = 'select-theme' | 'answering' | 'feedback' | 'results';

interface SimpleQuestion {
  id: string;
  text: string;
  theme: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  options: Array<{ id: string; text: string; option: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
}

interface UseExamSimulatorProps {
  questions: SimpleQuestion[];
}

export function useExamSimulator({ questions }: UseExamSimulatorProps) {
  const [state, setState] = useState<SimulatorState>('select-theme');
  const [theme, setTheme] = useState<string>('');
  const [themeQuestions, setThemeQuestions] = useState<SimpleQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedOption: string; isCorrect: boolean }>>([]);
  const [complementaryInfo, setComplementaryInfo] = useState<Array<{ fragment: string; documentName: string; pageNumber: number; category: string }>>([]);

  const themes = Array.from(new Set(questions.map((q) => q.theme)));

  const selectTheme = useCallback((t: string) => {
    setTheme(t);
    const filtered = questions.filter((q) => q.theme === t);
    setThemeQuestions(filtered);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setComplementaryInfo([]);
    setState('answering');
  }, [questions]);

  const selectOption = useCallback((opt: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOption(opt);
  }, []);

  const confirmAnswer = useCallback(async (option: 'A' | 'B' | 'C' | 'D') => {
    if (!option) return;
    const current = themeQuestions[currentIndex];
    const isCorrect = option === current.correctOption;
    setAnswers((prev) => [...prev, { questionId: current.id, selectedOption: option, isCorrect }]);

    // Buscar información complementaria en PDFs
    const searchTerms = current.text.split(' ').filter((w: string) => w.length > 4).slice(0, 3);
    let info: Array<{ fragment: string; documentName: string; pageNumber: number; category: string }> = [];
    for (const term of searchTerms) {
      const results = await pdfService.search(term);
      if (results.length > 0) {
        info = results.slice(0, 2);
        break;
      }
    }
    setComplementaryInfo(info);
    setState('feedback');
  }, [currentIndex, themeQuestions]);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setComplementaryInfo([]);
    if (currentIndex + 1 >= themeQuestions.length) {
      setState('results');
    } else {
      setState('answering');
    }
  }, [currentIndex, themeQuestions.length]);

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const incorrectAnswers = answers.length - correctAnswers;
  const percentage = answers.length > 0 ? Math.round((correctAnswers / answers.length) * 100) : 0;

  const incorrectQuestionIds = answers.filter((a) => !a.isCorrect).map((a) => a.questionId);
  const canRetryIncorrect = incorrectQuestionIds.length > 0;

  const retryIncorrect = useCallback(() => {
    const incorrect = themeQuestions.filter((q) => incorrectQuestionIds.includes(q.id));
    setThemeQuestions(incorrect);
    setCurrentIndex(0);
    setAnswers([]);
    setComplementaryInfo([]);
    setState('answering');
  }, [themeQuestions, incorrectQuestionIds]);

  const restart = useCallback(() => {
    setState('select-theme');
    setTheme('');
    setThemeQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setComplementaryInfo([]);
  }, []);

  const currentQuestion = themeQuestions[currentIndex];

  return {
    state,
    theme,
    themes,
    currentQuestion,
    currentIndex,
    totalQuestions: themeQuestions.length,
    selectedOption,
    answers,
    correctAnswers,
    incorrectAnswers,
    percentage,
    complementaryInfo,
    canRetryIncorrect,
    selectTheme,
    selectOption,
    confirmAnswer,
    nextQuestion,
    retryIncorrect,
    restart,
    isFinished: state === 'results',
  };
}
