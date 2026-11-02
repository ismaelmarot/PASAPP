import { useState } from 'react';

interface UseQuestionCardProps {
  options: Array<{ id: string; text: string; option: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
  onAnswer: (selectedOption: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
}

export function useQuestionCard({ options, onAnswer }: UseQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (confirmed) return;
    setSelectedOption(option);
  };

  const confirmAnswer = (option: 'A' | 'B' | 'C' | 'D') => {
    if (confirmed) return;
    setConfirmed(true);
    const selected = options.find((o) => o.option === option);
    onAnswer(option, selected?.isCorrect ?? false);
  };

  const isSelected = (option: 'A' | 'B' | 'C' | 'D') => selectedOption === option;
  const isDisabled = () => confirmed;

  return {
    selectedOption,
    confirmed,
    selectOption,
    confirmAnswer,
    isSelected,
    isDisabled,
  };
}
