import {
  Container,
  Header,
  Title,
  Subtitle,
  QuickGrid,
  QuickCard,
  CardTitle,
  CardDescription,
  ProgressSection,
  CardLabel,
  CardValue,
  ProgressMeta,
  EmptyState,
} from './Dashboard.styles';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon';
import type { ExamResult } from '@/interfaces';

export type AppView = 'inicio' | 'simulador' | 'biblioteca' | 'importar' | 'estadisticas';

export interface DashboardProps {
  examResults: ExamResult[];
  onNavigate: (view: AppView) => void;
}

interface QuickAction {
  view: AppView;
  icon: IconName;
  title: string;
  description: string;
}

export function Dashboard({ examResults, onNavigate }: DashboardProps): JSX.Element {
  const latest = examResults[examResults.length - 1];
  const percentage = latest?.percentage ?? 0;
  const answered = latest?.totalQuestions ?? 0;
  const correct = latest?.correctAnswers ?? 0;
  const pendingReview = latest ? Math.max(latest.incorrectAnswers, 0) : 0;

  const quickActions: QuickAction[] = [
    { view: 'simulador', icon: 'play', title: 'Simulacro', description: 'Practica preguntas por tema' },
    { view: 'biblioteca', icon: 'layers', title: 'Biblioteca', description: 'Leyes y apuntes' },
    { view: 'estadisticas', icon: 'chart', title: 'Estadísticas', description: 'Revisa tu progreso' },
    { view: 'importar', icon: 'clipboard', title: 'Importar', description: 'Sube un Excel con preguntas' },
  ];

  return (
    <Container>
      <Header>
        <Title>Bienvenido a PASAPP</Title>
        <Subtitle>Practica con simulacros inspirados en el examen de Productor Asesor de Seguros</Subtitle>
      </Header>

      <QuickGrid>
        {quickActions.map((action) => (
          <QuickCard key={action.view} onClick={() => onNavigate(action.view)}>
            <Icon name={action.icon} size={22} />
            <CardTitle>{action.title}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
          </QuickCard>
        ))}
      </QuickGrid>

      {latest ? (
        <ProgressSection>
          <CardLabel>Último simulacro</CardLabel>
          <CardValue>{percentage}%</CardValue>
          <ProgressMeta>{correct} de {answered} correctas</ProgressMeta>
          <ProgressMeta>{pendingReview} pendientes de repaso</ProgressMeta>
          <Button variant="secondary" onClick={() => onNavigate('simulador')}>
            Practicar
          </Button>
        </ProgressSection>
      ) : (
        <EmptyState>
          <CardTitle>Todavía no hay simulacros</CardTitle>
          <CardDescription>Comienza tu primer simulacro para ver tu progreso.</CardDescription>
          <Button variant="primary" onClick={() => onNavigate('simulador')}>
            Iniciar simulacro
          </Button>
        </EmptyState>
      )}
    </Container>
  );
}
