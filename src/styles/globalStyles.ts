import { createGlobalStyle } from 'styled-components';
import { themeVariables, typography } from './theme';

export const GlobalStyles = createGlobalStyle`
  ${themeVariables}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${typography.fontFamily};
    background-color: var(--color-bg);
    color: var(--color-text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    color: var(--color-text-primary);
    line-height: 1.2;
    letter-spacing: ${typography.letterSpacing.tight};
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
