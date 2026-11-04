import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

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

export const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const ThemeOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  cursor: pointer;
`;

export const ThemeCheckbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--color-accent);
  cursor: pointer;
`;

export const SimulatorControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const ControlLabel = styled.label`
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
`;

export const CountInput = styled.input`
  width: 5rem;
  padding: ${spacing.sm} ${spacing.sm};
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: ${borderRadius.md};
`;

export const ModeSelect = styled.select`
  padding: ${spacing.sm} ${spacing.sm};
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: ${borderRadius.md};
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

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${spacing.lg};
  padding: ${spacing.xl} ${spacing.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${borderRadius.lg};
  box-shadow: var(--shadow);
`;

export const ScoreDisplay = styled.div`
  font-size: var(--font-size-huge);
  font-weight: 700;
  color: var(--color-accent);
`;

export const ResultTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${spacing.sm};
`;

export const ResultSubtitle = styled.p`
  font-size: var(--font-size-body);
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const ResultStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${spacing.md};
  width: 100%;
`;

export const ResultStatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.sm};
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border-subtle);
  border-radius: ${borderRadius.md};
`;

export const ResultStatLabel = styled.span`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
`;

export const ResultStatValue = styled.span`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
`;

export const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
`;
