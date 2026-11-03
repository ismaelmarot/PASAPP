import styled from 'styled-components';
import { spacing } from '@/styles';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
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

export const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${spacing.md};
`;

export const QuickCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  text-align: left;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.05s ease;

  &:hover {
    border-color: var(--color-accent);
    background: var(--color-surfaceAlt);
  }

  &:active {
    background: var(--color-surfaceHover);
  }
`;

export const CardTitle = styled.h3`
  font-size: var(--font-size-h4);
  font-weight: 600;
  color: var(--color-text-primary);
`;

export const CardDescription = styled.p`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
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

export const ProgressMeta = styled.p`
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
