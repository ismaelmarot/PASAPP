import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MaterialLibrary, ImportExcel, ExamSimulator, Dashboard, Statistics, Nav, Icon } from '@/components';
import type { AppView } from '@/components/Dashboard';
import type { NavItem } from '@/components/Nav';
import { useQuestions, useDocuments, useExamResults } from '@/hooks';
import { GlobalStyles, spacing, borderRadius } from '@/styles';

const NAV_ITEMS: NavItem[] = [
  { key: 'inicio', label: 'Inicio', icon: 'home' },
  { key: 'estudiar', label: 'Estudiar', icon: 'book' },
  { key: 'simulacros', label: 'Simulacros', icon: 'clipboard' },
  { key: 'biblioteca', label: 'Biblioteca', icon: 'layers' },
  { key: 'estadisticas', label: 'Estadísticas', icon: 'chart' },
];

const NAV_TO_VIEW: Record<string, AppView> = {
  inicio: 'inicio',
  estudiar: 'simulador',
  simulacros: 'simulador',
  biblioteca: 'biblioteca',
  estadisticas: 'estadisticas',
};

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--color-bg);
`;

const Sidebar = styled.aside<{ $collapsed?: boolean }>`
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  padding: ${spacing.lg} ${spacing.md};

  @media (min-width: 768px) {
    width: ${(p) => (p.$collapsed ? '0' : '240px')};
    min-height: 100vh;
    border-right: ${(p) => (p.$collapsed ? 'none' : '1px solid var(--color-border)')};
    border-bottom: none;
    padding: ${(p) => (p.$collapsed ? '0' : `calc(${spacing.lg} + 2.25rem + ${spacing.md}) ${spacing.md}`)};
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    flex-shrink: 0;
    transition: width 0.2s ease, padding 0.2s ease;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.xl};
`;

const ToggleButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: ${borderRadius.md};
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--color-surface-alt);
  }

  @media (min-width: 768px) {
    display: inline-flex;
    position: fixed;
    left: ${spacing.md};
    top: ${spacing.lg};
    z-index: 30;
  }
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  width: 100%;
  padding: ${spacing.md};
  font-size: var(--font-size-base);
  font-weight: 500;
  text-align: left;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--color-surface-alt);
    color: var(--color-text-primary);
  }
`;

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'pasapp-theme';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App(): JSX.Element {
  const [view, setView] = useState<AppView>('inicio');
  const [activeKey, setActiveKey] = useState<string>('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);
  const { questions, refresh } = useQuestions();
  const { documents } = useDocuments();
  const { examResults } = useExamResults();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((mode) => (mode === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (input: string) => {
    const nextView = NAV_TO_VIEW[input] ?? (input as AppView);
    if (!nextView) return;
    setView(nextView);
    setActiveKey(input);
  };

  const handleImported = async () => {
    await refresh();
    handleNavigate('estudiar');
  };

  return (
    <>
      <GlobalStyles />
      <Layout>
        <Sidebar $collapsed={sidebarCollapsed}>
          <Nav items={NAV_ITEMS} active={activeKey} onNavigate={handleNavigate} />
          <ToggleButton
            type="button"
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={sidebarCollapsed ? 'Mostrar menú' : 'Ocultar menú'}
          >
            {sidebarCollapsed ? '☰' : '«'}
          </ToggleButton>
          <ThemeButton
            type="button"
            onClick={toggleTheme}
            aria-label={themeMode === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
            title={themeMode === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            <Icon name={themeMode === 'dark' ? 'sun' : 'moon'} size={18} />
            <span>{themeMode === 'dark' ? 'Claro' : 'Oscuro'}</span>
          </ThemeButton>
        </Sidebar>
        <Main>
          {view === 'inicio' && <Dashboard examResults={examResults} onNavigate={handleNavigate} />}
          {view === 'simulador' && <ExamSimulator questions={questions} />}
          {view === 'biblioteca' && <MaterialLibrary materials={documents} />}
          {view === 'importar' && <ImportExcel onImported={handleImported} />}
          {view === 'estadisticas' && <Statistics examResults={examResults} />}
        </Main>
      </Layout>
    </>
  );
}

export default App;
