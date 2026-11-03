import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

export const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: ${spacing.lg};
`;

export const Title = styled.h1`
  font-size: var(--font-size-h2);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: ${spacing.md};
`;

export const Description = styled.p`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  margin-bottom: ${spacing.lg};
`;

export const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: ${spacing.md};
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing.lg};
`;

export const Result = styled.div`
  margin-top: ${spacing.lg};
  padding: ${spacing.md};
  background: var(--color-surfaceAlt);
  border: 1px solid var(--color-border);
  border-radius: ${borderRadius.md};
  font-size: var(--font-size-caption);
  color: var(--color-textPrimary);
`;

export const ResultError = styled.p`
  color: var(--color-error);
`;

export const Actions = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};
`;
