import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Nav } from './Nav';
import type { NavItem } from './Nav';

describe('Nav', () => {
  const items: NavItem[] = [
    { key: 'inicio', label: 'Inicio', icon: 'home' },
    { key: 'biblioteca', label: 'Biblioteca', icon: 'layers' },
  ];

  it('renders all navigation items', () => {
    render(<Nav items={items} active="inicio" onNavigate={() => {}} />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Biblioteca')).toBeInTheDocument();
  });

  it('calls onNavigate with the clicked item key', () => {
    const onNavigate = vi.fn();
    render(<Nav items={items} active="inicio" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('Biblioteca'));
    expect(onNavigate).toHaveBeenCalledWith('biblioteca');
  });

  it('marks the active item with aria-current', () => {
    render(<Nav items={items} active="inicio" onNavigate={() => {}} />);
    expect(screen.getByText('Inicio').closest('button')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Biblioteca').closest('button')).not.toHaveAttribute('aria-current');
  });
});
