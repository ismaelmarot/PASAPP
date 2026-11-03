import styled from 'styled-components';
import { spacing } from '@/styles';

export const SimulatorContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

export const ProgressBar = styled.div<{ percent: number }>`
  height: 0.5rem;
  background: var(--color-border-subtle);
  border-radius: var(--radius-pill);
  overflow: hidden;
  margin-bottom: ${spacing.sm};
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  background: var(--color-accent);
  width: ${(p) => p.percent}%;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  margin-bottom: ${spacing.sm};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
`;

export const QuestionContainer = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const ResultsContainer = styled.div`
  text-align: center;
  padding: ${spacing.xl} ${spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
`;

export const BigPercentage = styled.div`
  font-size: var(--font-size-huge);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: ${spacing.sm};
`;
