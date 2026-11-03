import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

interface MaterialItemProps {
  category: 'ley' | 'apunte' | 'preguntas';
}

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.lg};
`;

export const CategorySection = styled.section`
  margin-bottom: ${spacing.xxl};
`;

export const CategoryTitle = styled.h2`
  font-size: var(--font-size-h3);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: ${spacing.md};
  border-bottom: 1px solid var(--color-border-subtle);
  padding-bottom: ${spacing.sm};
`;

export const MaterialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const MaterialItem = styled.div<MaterialItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: var(--color-surface-alt);
    box-shadow: var(--shadow);
  }

  &:active {
    background: var(--color-surface-hover);
  }
`;

export const MaterialName = styled.span`
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
`;

export const CategoryBadge = styled.span<MaterialItemProps>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.1875rem 0.625rem;
  border-radius: ${borderRadius.sm};
  background: ${(p) =>
    p.category === 'ley'
      ? 'var(--color-accent-soft)'
      : p.category === 'apunte'
        ? 'var(--color-success-soft)'
        : p.category === 'preguntas'
          ? 'var(--color-error-soft)'
          : 'var(--color-surface-alt)'};
  color: ${(p) =>
    p.category === 'ley'
      ? 'var(--color-accent)'
      : p.category === 'apunte'
        ? 'var(--color-success)'
        : p.category === 'preguntas'
          ? 'var(--color-error)'
          : 'var(--color-text-secondary)'};
`;

export const EmptyState = styled.div`
  padding: ${spacing.xl};
  text-align: center;
  color: var(--color-text-secondary);
`;
