import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components';

describe('Button', () => {
  it('renders label and calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Aceptar</Button>);
    const button = screen.getByRole('button', { name: /aceptar/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Deshabilitado</Button>);
    const button = screen.getByRole('button', { name: /deshabilitado/i });
    expect(button).toBeDisabled();
  });
});
