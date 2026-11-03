import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImportExcel } from '@/components';

vi.mock('@/services', () => ({
  importExcel: vi.fn().mockResolvedValue({ imported: 2, errors: [], questions: [] }),
  storageService: { saveBatch: vi.fn().mockResolvedValue(undefined) },
}));

describe('ImportExcel', () => {
  it('renders the import form', () => {
    render(<ImportExcel onImported={() => {}} />);
    expect(screen.getByText(/importar preguntas/i)).toBeInTheDocument();
  });

  it('renders file input', () => {
    render(<ImportExcel onImported={() => {}} />);
    expect(screen.getByLabelText(/seleccionar archivo/i)).toBeInTheDocument();
  });

  it('shows imported result after file selection', async () => {
    render(<ImportExcel onImported={() => {}} />);
    const input = screen.getByLabelText(/seleccionar archivo/i) as HTMLInputElement;
    const file = new File(['dummy'], 'preguntas.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText(/preguntas importadas: 2/i)).toBeInTheDocument();
    });
  });
});
