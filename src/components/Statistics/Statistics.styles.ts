import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const Title = styled.h1`
  font-size: var(--font-size-h1);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
`;

export const SummaryCard = styled.div`
  padding: ${spacing.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const CardLabel = styled.span`
  font-size: var(--font-size-caption);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
`;

export const CardValue = styled.div`
  font-size: var(--font-size-huge);
  font-weight: 700;
  color: var(--color-accent);
`;

export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${borderRadius.md};
`;

export const ResultTheme = styled.span`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
`;

export const ResultMeta = styled.span`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
`;

export const EmptyState = styled.div`
  padding: ${spacing.xl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
`;
