export const colors = {
  light: {
    background: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f5f5f7',
    surfaceHover: '#e8e8ed',
    textPrimary: '#1d1d1f',
    textSecondary: '#6e6e73',
    textTertiary: '#86868d',
    border: '#d2d2d7',
    borderSubtle: '#e5e5ea',
    accent: '#0066cc',
    accentHover: '#0055aa',
    accentSoft: '#e8f0ff',
    success: '#34c759',
    successSoft: '#f0fff4',
    error: '#ff3b30',
    errorSoft: '#fff0f0',
    warning: '#ff9500',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },
  dark: {
    background: '#000000',
    surface: '#1c1c1e',
    surfaceAlt: '#2c2c2e',
    surfaceHover: '#3a3c3e',
    textPrimary: '#ffffff',
    textSecondary: '#8e8e93',
    textTertiary: '#98989d',
    border: '#38383a',
    borderSubtle: '#2c2c2e',
    accent: '#0a84ff',
    accentHover: '#2f7de1',
    accentSoft: 'rgba(10, 132, 255, 0.2)',
    success: '#30d158',
    successSoft: 'rgba(48, 209, 88, 0.16)',
    error: '#ff453a',
    errorSoft: 'rgba(255, 69, 58, 0.16)',
    warning: '#ff9f0a',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
} as const;

export type ColorToken = keyof typeof colors.light;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  pill: '9999px',
} as const;

export const shadows = {
  light: '0 1px 3px rgba(0, 0, 0, 0.08)',
  dark: '0 1px 3px rgba(0, 0, 0, 0.5)',
} as const;

export const typography = {
  fontFamily: "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    huge: '2.5rem',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
  },
} as const;

export const theme = colors.light;

export const themeVariables = `
  :root {
    color-scheme: light;
    --color-bg: #ffffff;
    --color-surface: #ffffff;
    --color-surface-alt: #f5f5f7;
    --color-surface-hover: #e8e8ed;
    --color-text-primary: #1d1d1f;
    --color-text-secondary: #6e6e73;
    --color-text-tertiary: #86868d;
    --color-border: #d2d2d7;
    --color-border-subtle: #e5e5ea;
    --color-accent: #0066cc;
    --color-accent-hover: #0055aa;
    --color-accent-soft: #e8f0ff;
    --color-success: #34c759;
    --color-success-soft: #f0fff4;
    --color-error: #ff3b30;
    --color-error-soft: #fff0f0;
    --color-warning: #ff9500;
    --color-overlay: rgba(0, 0, 0, 0.3);
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-pill: 9999px;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    --font-family: ${typography.fontFamily};
    --font-size-base: 1rem;
    --font-size-h1: 2rem;
    --font-size-h2: 1.5rem;
    --font-size-h3: 1.25rem;
    --font-size-h4: 1.125rem;
    --font-size-body: 1rem;
    --font-size-caption: 0.875rem;
  }

  [data-theme='dark'] {
    color-scheme: dark;
    --color-bg: #000000;
      --color-surface: #1c1c1e;
      --color-surface-alt: #2c2c2e;
      --color-surface-hover: #3a3c3e;
      --color-text-primary: #ffffff;
      --color-text-secondary: #8e8e93;
      --color-text-tertiary: #98989d;
      --color-border: #38383a;
      --color-border-subtle: #2c2c2e;
      --color-accent: #0a84ff;
      --color-accent-hover: #2f7de1;
      --color-accent-soft: rgba(10, 132, 255, 0.2);
      --color-success: #30d158;
      --color-success-soft: rgba(48, 209, 88, 0.16);
      --color-error: #ff453a;
      --color-error-soft: rgba(255, 69, 58, 0.16);
      --color-warning: #ff9f0a;
      --color-overlay: rgba(0, 0, 0, 0.6);
      --shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

export const fontStack = "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
