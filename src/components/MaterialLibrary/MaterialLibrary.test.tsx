import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MaterialLibrary } from '@/components';

const materials = [
  { name: 'Ley 17.418.pdf', category: 'ley' as const, filePath: '/laws/ley1.pdf' },
  { name: 'Ley 22.415.pdf', category: 'ley' as const, filePath: '/laws/ley2.pdf' },
  { name: 'Apuntes Riesgos.pdf', category: 'apunte' as const, filePath: '/notes/riesgos.pdf' },
  { name: 'Preguntas 2024.xlsx', category: 'preguntas' as const, filePath: '/questions/questions.xlsx' },
];

describe('MaterialLibrary', () => {
  it('groups materials by category', () => {
    render(<MaterialLibrary materials={materials} />);
    expect(screen.getByText(/leyes/i)).toBeInTheDocument();
    expect(screen.getAllByText(/apuntes/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/preguntas/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ley').length).toBe(2);
    expect(screen.getAllByText('apunte').length).toBe(1);
    expect(screen.getAllByText('preguntas').length).toBe(1);
  });

  it('shows material name and category badge', () => {
    render(<MaterialLibrary materials={materials} />);
    expect(screen.getByText(/Ley 17.418.pdf/)).toBeInTheDocument();
    expect(screen.getAllByText('ley').length).toBe(2);
    expect(screen.getAllByText('apunte').length).toBe(1);
    expect(screen.getAllByText('preguntas').length).toBe(1);
  });

  it('shows empty state when category has no items', () => {
    render(<MaterialLibrary materials={[]} />);
    expect(screen.getAllByText(/no hay archivos en esta categoría/i).length).toBe(3);
  });
});
