import {
  Container,
  Title,
  Subtitle,
  SummaryCard,
  CardLabel,
  CardValue,
  ResultList,
  ResultItem,
  ResultTheme,
  ResultMeta,
  EmptyState,
} from './Statistics.styles';
import { CardTitle, CardDescription } from '@/components/Dashboard/Dashboard.styles';
import type { ExamResult } from '@/interfaces';

export interface StatisticsProps {
  examResults: ExamResult[];
}

export function Statistics({ examResults }: StatisticsProps): JSX.Element {
  if (examResults.length === 0) {
    return (
      <Container>
        <Title>Estadísticas</Title>
        <EmptyState>
          <CardTitle>Todavía no hay simulacros</CardTitle>
          <CardDescription>Completa un simulacro para ver tus estadísticas.</CardDescription>
        </EmptyState>
      </Container>
    );
  }

  const average = Math.round(
    examResults.reduce((acc, r) => acc + r.percentage, 0) / examResults.length,
  );
  const latest = examResults[examResults.length - 1];

  return (
    <Container>
      <Title>Estadísticas</Title>
      <Subtitle>Historial de tus simulacros</Subtitle>
      <SummaryCard>
        <CardLabel>Promedio general</CardLabel>
        <CardValue>{average}%</CardValue>
      </SummaryCard>
      <ResultList>
        {examResults.map((r) => (
          <ResultItem key={r.id}>
            <ResultTheme>{r.theme}</ResultTheme>
            <ResultMeta>
              {r.correctAnswers} de {r.totalQuestions} correctas
            </ResultMeta>
            <CardValue>{r.percentage}%</CardValue>
            <span>{new Date(r.createdAt).toLocaleDateString()}</span>
          </ResultItem>
        ))}
      </ResultList>
      {latest && (
        <Subtitle>
          Último simulacro: {latest.theme} — {latest.percentage}%
        </Subtitle>
      )}
    </Container>
  );
}
