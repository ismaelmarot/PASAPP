export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0 %';
  return `${((value / total) * 100).toFixed(0)} %`;
}
