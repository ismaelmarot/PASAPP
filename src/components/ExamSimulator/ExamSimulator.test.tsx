import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExamSimulator } from '@/components';

vi.mock('@/services', () => ({
  pdfService: {
    search: vi.fn().mockResolvedValue([]),
  },
}));

const questions = [
  {
    id: 'q1',
    text: '¿Qué es un seguro?',
    theme: 'Seguros Generales',
    correctOption: 'A' as const,
    options: [
      { id: 'o1', text: 'Contrato', option: 'A' as const, isCorrect: true },
      { id: 'o2', text: 'Ley', option: 'B' as const, isCorrect: false },
      { id: 'o3', text: 'Póliza', option: 'C' as const, isCorrect: false },
      { id: 'o4', text: 'Prima', option: 'D' as const, isCorrect: false },
    ],
  },
  {
    id: 'q2',
    text: '¿Qué es la póliza?',
    theme: 'Seguros Generales',
    correctOption: 'A' as const,
    options: [
      { id: 'o5', text: 'Documento', option: 'A' as const, isCorrect: true },
      { id: 'o6', text: 'Ley', option: 'B' as const, isCorrect: false },
      { id: 'o7', text: 'Contrato', option: 'C' as const, isCorrect: false },
      { id: 'o8', text: 'Factura', option: 'D' as const, isCorrect: false },
    ],
  },
];

describe('ExamSimulator', () => {
  it('shows theme selection screen initially', () => {
    render(<ExamSimulator questions={questions} />);
    expect(screen.getByText(/seleccionar tema/i)).toBeInTheDocument();
  });

  it('starts answering after selecting a theme', () => {
    render(<ExamSimulator questions={questions} />);
    const themeBtn = screen.getByText(/seguros generales/i);
    fireEvent.click(themeBtn);
    expect(screen.getByText(/¿qué es un seguro/i)).toBeInTheDocument();
  });

  it('records answer and shows feedback', () => {
    render(<ExamSimulator questions={questions} />);
    fireEvent.click(screen.getByText(/seguros generales/i));
    const optionA = screen.getByText(/A\. Contrato/);
    fireEvent.click(optionA);
    expect(screen.getByText(/respuesta correcta/i)).toBeInTheDocument();
  });
});
