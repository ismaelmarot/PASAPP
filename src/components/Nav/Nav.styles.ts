import styled from 'styled-components';
import { spacing, borderRadius } from '@/styles';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  list-style: none;
`;

interface NavItemButtonProps {
  $active?: boolean;
}

export const NavItemButton = styled.button<NavItemButtonProps>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  width: 100%;
  padding: ${spacing.md};
  font-size: var(--font-size-base);
  font-weight: ${(p) => (p.$active ? 600 : 500)};
  text-align: left;
  color: ${(p) => (p.$active ? 'var(--color-accent)' : 'var(--color-text-secondary)')};
  background: ${(p) => (p.$active ? 'var(--color-accentSoft)' : 'transparent')};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--color-surfaceAlt);
    color: var(--color-text-primary);
  }

  &:active {
    background: var(--color-surfaceHover);
  }
`;
