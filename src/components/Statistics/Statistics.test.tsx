import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Statistics } from './Statistics';
import type { ExamResult } from '@/interfaces';

describe('Statistics', () => {
  const examResults: ExamResult[] = [
    {
      id: 'r1',
      theme: 'Seguros Generales',
      totalQuestions: 10,
      correctAnswers: 7,
      incorrectAnswers: 3,
      percentage: 70,
      createdAt: '2026-11-01T10:00:00.000Z',
    },
  ];

  it('renders the title', () => {
    render(<Statistics examResults={examResults} />);
    expect(screen.getByText('Estadísticas')).toBeInTheDocument();
  });

  it('renders empty state when no exam results', () => {
    render(<Statistics examResults={[]} />);
    expect(screen.getByText(/todavía no hay simulacros/i)).toBeInTheDocument();
  });

  it('renders average summary when exam results exist', () => {
    render(<Statistics examResults={examResults} />);
    expect(screen.getByText(/promedio general/i)).toBeInTheDocument();
    expect(screen.getAllByText('70%').length).toBeGreaterThan(0);
  });
});
