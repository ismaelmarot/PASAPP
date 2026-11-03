import styled, { css } from 'styled-components';
import { spacing, borderRadius } from '@/styles';

export interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  disabled?: boolean;
  $loading?: boolean;
}

export const buttonBackground = (variant?: StyledButtonProps['variant']): string => {
  switch (variant) {
    case 'secondary':
      return 'var(--color-surface-alt)';
    case 'tertiary':
      return 'transparent';
    case 'destructive':
      return 'var(--color-error)';
    default:
      return 'var(--color-accent)';
  }
};

export const buttonColor = (variant?: StyledButtonProps['variant']): string => {
  switch (variant) {
    case 'secondary':
      return 'var(--color-text-primary)';
    case 'tertiary':
      return 'var(--color-accent)';
    case 'destructive':
      return 'var(--color-bg)';
    default:
      return 'var(--color-bg)';
  }
};

export const Root = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${spacing.md} ${spacing.xl};
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  border-radius: ${borderRadius.md};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, transform 0.05s ease;

  background-color: ${(p) => buttonBackground(p.variant)};
  color: ${(p) => buttonColor(p.variant)};

  &:hover:not(:disabled) {
    background-color: ${(p) => {
      switch (p.variant) {
        case 'secondary':
          return 'var(--color-surface-hover)';
        case 'tertiary':
          return 'var(--color-surface-alt)';
        case 'destructive':
          return 'var(--color-error)';
        default:
          return 'var(--color-accent-hover)';
      }
    }};
  }

  &:active:not(:disabled) {
    background-color: ${(p) => {
      switch (p.variant) {
        case 'secondary':
          return 'var(--color-border-subtle)';
        case 'tertiary':
          return 'var(--color-surface-alt)';
        case 'destructive':
          return 'var(--color-error)';
        default:
          return 'var(--color-accent-hover)';
      }
    }};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${(p) => p.$loading && css`
    opacity: 0.7;
    cursor: progress;
  `}

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;
