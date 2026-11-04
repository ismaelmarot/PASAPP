import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

interface OptionProps {
  selected: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
`;

export const QuestionText = styled.p`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const OptionButton = styled.button<OptionProps>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  width: 100%;
  padding: ${spacing.md};
  font-size: var(--font-size-lg);
  font-weight: 500;
  text-align: left;
  border-radius: ${borderRadius.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  ${(p) =>
    p.selected &&
    `
    border-color: var(--color-accent);
    background: var(--color-accent-soft);
    color: var(--color-accent);
  `}

  ${(p) =>
    p.correct &&
    `
    border-color: var(--color-success);
    background: var(--color-success-soft);
    color: var(--color-success);
  `}

  ${(p) =>
    p.incorrect &&
    `
    border-color: var(--color-error);
    background: var(--color-error-soft);
    color: var(--color-error);
  `}

  &:hover:not(:disabled) {
    border-color: var(--color-accent);
    background: var(--color-surface-alt);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Feedback = styled.p<{ correct?: boolean }>`
  margin-top: ${spacing.sm};
  font-size: var(--font-size-caption);
  font-weight: 500;
  color: ${(p) => (p.correct ? 'var(--color-success)' : 'var(--color-error)')};
`;
