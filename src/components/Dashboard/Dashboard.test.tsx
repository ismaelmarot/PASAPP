import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Dashboard } from './Dashboard';
import type { ExamResult } from '@/interfaces';

describe('Dashboard', () => {
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

  it('renders welcome title', () => {
    render(<Dashboard examResults={examResults} onNavigate={() => {}} />);
    expect(screen.getByText(/bienvenido a pasapp/i)).toBeInTheDocument();
  });

  it('renders quick actions', () => {
    render(<Dashboard examResults={examResults} onNavigate={() => {}} />);
    expect(screen.getByText('Simulacro')).toBeInTheDocument();
    expect(screen.getByText('Biblioteca')).toBeInTheDocument();
    expect(screen.getByText('Estadísticas')).toBeInTheDocument();
    expect(screen.getByText('Importar')).toBeInTheDocument();
  });

  it('renders latest progress when exam results exist', () => {
    render(<Dashboard examResults={examResults} onNavigate={() => {}} />);
    expect(screen.getByText(/último simulacro/i)).toBeInTheDocument();
    expect(screen.getByText(/7 de 10 correctas/i)).toBeInTheDocument();
  });

  it('renders empty state when no exam results', () => {
    render(<Dashboard examResults={[]} onNavigate={() => {}} />);
    expect(screen.getByText(/todavía no hay simulacros/i)).toBeInTheDocument();
  });
});
