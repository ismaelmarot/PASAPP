import styled from 'styled-components';

interface OptionProps {
  selected: boolean;
  correct?: boolean;
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #d2d2d7;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

export const QuestionText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

export const OptionButton = styled.button<OptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d2d2d7;
  background: #ffffff;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.1s ease;

  ${(p) =>
    p.selected &&
    `
    border-color: #0066cc;
    background: #e8f0ff;
    color: #0066cc;
  `}

  ${(p) =>
    p.correct &&
    `
    border-color: #34c759;
    background: #f0fff4;
    color: #34c759;
  `}

  ${(p) =>
    !p.selected && p.correct === false &&
    `
    border-color: #ff3b30;
    background: #fff0f0;
    color: #ff3b30;
  `}

  &:hover:not(:disabled) {
    border-color: #0066cc;
    background: #f5f5f7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Feedback = styled.p<{ correct?: boolean }>`
  margin-top: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${(p) => (p.correct ? '#34c759' : '#ff3b30')};
`;
