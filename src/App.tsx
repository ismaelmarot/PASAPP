import { useState } from 'react';
import styled from 'styled-components';
import { MaterialLibrary, ImportExcel, ExamSimulator, Dashboard, Statistics, Nav } from '@/components';
import type { AppView } from '@/components/Dashboard';
import type { NavItem } from '@/components/Nav';
import { useQuestions, useDocuments, useExamResults } from '@/hooks';
import { GlobalStyles, spacing } from '@/styles';

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

const Sidebar = styled.aside`
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  padding: ${spacing.lg} ${spacing.md};

  @media (min-width: 768px) {
    width: 240px;
    min-height: 100vh;
    border-right: 1px solid var(--color-border);
    border-bottom: none;
    padding: ${spacing.lg} ${spacing.md};
    position: sticky;
    top: 0;
    height: 100vh;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.xl};
`;

function App(): JSX.Element {
  const [view, setView] = useState<AppView>('inicio');
  const [activeKey, setActiveKey] = useState<string>('inicio');
  const { questions, refresh } = useQuestions();
  const { documents } = useDocuments();
  const { examResults } = useExamResults();

  const handleNavigate = (key: string) => {
    const nextView = NAV_TO_VIEW[key];
    if (!nextView) return;
    setView(nextView);
    setActiveKey(key);
  };

  const handleImported = async () => {
    await refresh();
    handleNavigate('estudiar');
  };

  return (
    <>
      <GlobalStyles />
      <Layout>
        <Sidebar>
          <Nav items={NAV_ITEMS} active={activeKey} onNavigate={handleNavigate} />
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
