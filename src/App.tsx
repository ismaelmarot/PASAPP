import { useState } from 'react';
import { MaterialLibrary, ImportExcel, ExamSimulator } from '@/components';
import { useQuestions, useDocuments } from '@/hooks';
import { GlobalStyles } from '@/styles';

type View = 'biblioteca' | 'importar' | 'simulador';

function App(): JSX.Element {
  const [view, setView] = useState<View>('biblioteca');
  const { questions } = useQuestions();
  const { documents } = useDocuments();

  return (
    <>
      <GlobalStyles />
      {view === 'biblioteca' && <MaterialLibrary materials={documents} />}
      {view === 'importar' && <ImportExcel onImported={() => setView('simulador')} />}
      {view === 'simulador' && <ExamSimulator questions={questions} />}

      <nav>
        <button type="button" onClick={() => setView('biblioteca')}>Biblioteca</button>
        <button type="button" onClick={() => setView('importar')}>Importar</button>
        <button type="button" onClick={() => setView('simulador')}>Simulador</button>
      </nav>
    </>
  );
}

export default App;
