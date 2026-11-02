import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionCard } from '@/components';

const question = {
  id: 'q1',
  text: '¿Qué es un seguro?',
  correctOption: 'A' as const,
  options: [
    { id: 'o1', text: 'Contrato de cobertura', option: 'A' as const, isCorrect: true },
    { id: 'o2', text: 'Una ley', option: 'B' as const, isCorrect: false },
    { id: 'o3', text: 'Una póliza de vida', option: 'C' as const, isCorrect: false },
    { id: 'o4', text: 'Un banco', option: 'D' as const, isCorrect: false },
  ],
};

describe('QuestionCard', () => {
  it('renders question and 4 options', () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={question} onAnswer={onAnswer} />);
    expect(screen.getByText(/qué es un seguro/i)).toBeInTheDocument();
    expect(screen.getByText(/A\. Contrato de cobertura/)).toBeInTheDocument();
    expect(screen.getByText(/B\. Una ley/)).toBeInTheDocument();
    expect(screen.getByText(/C\. Una póliza de vida/)).toBeInTheDocument();
    expect(screen.getByText(/D\. Un banco/)).toBeInTheDocument();
  });

  it('calls onAnswer with selected option and correctness when confirmed', () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={question} onAnswer={onAnswer} />);
    const optionA = screen.getByText(/A\. Contrato de cobertura/);
    fireEvent.click(optionA);
    expect(onAnswer).toHaveBeenCalledWith('A', true);
  });

  it('disables options after confirming', () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={question} onAnswer={onAnswer} />);
    const optionB = screen.getByText(/B\. Una ley/);
    fireEvent.click(optionB);
    const updatedOptionB = screen.getByText(/B\. Una ley/);
    expect(updatedOptionB).toBeDisabled();
  });
});
