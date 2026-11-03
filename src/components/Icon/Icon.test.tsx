import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './Icon';
import type { IconName } from './Icon';

describe('Icon', () => {
  it('renders an svg element', () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders with custom size', () => {
    const { container } = render(<Icon name="home" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders each icon name without crashing', () => {
    const names: IconName[] = ['home', 'book', 'clipboard', 'layers', 'chart', 'check', 'x', 'play', 'trash', 'arrowRight', 'bookOpen', 'fileText', 'clock', 'target'];
    names.forEach((name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector('svg')).not.toBeNull();
    });
  });
});
