import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export const Root = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease, opacity 0.1s ease;

  background-color: ${(p) => (p.variant === 'secondary' ? '#f5f5f7' : '#0066cc')};
  color: ${(p) => (p.variant === 'secondary' ? '#1d1d1f' : '#ffffff')};

  &:hover:not(:disabled) {
    background-color: ${(p) =>
      p.variant === 'secondary' ? '#e5e5ea' : '#0055aa'};
  }

  &:active:not(:disabled) {
    background-color: ${(p) =>
      p.variant === 'secondary' ? '#d2d2d7' : '#004499'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
`;
