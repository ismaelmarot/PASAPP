import {
  SimulatorContainer,
  ThemeGrid,
  ProgressBar,
  ProgressFill,
  StatsRow,
  StatItem,
  StatValue,
  QuestionContainer,
  ResultsContainer,
  BigPercentage,
} from './ExamSimulator.styles';
import { Button, QuestionCard } from '@/components';
import { useExamSimulator } from './useExamSimulator';

export interface ExamSimulatorProps {
  questions: Array<{
    id: string;
    text: string;
    theme: string;
    correctOption: 'A' | 'B' | 'C' | 'D';
    options: Array<{ id: string; text: string; option: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
  }>;
}

export function ExamSimulator({ questions }: ExamSimulatorProps) {
  const {
    state,
    theme,
    themes,
    currentQuestion,
    currentIndex,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage,
    canRetryIncorrect,
    selectTheme,
    confirmAnswer,
    nextQuestion,
    retryIncorrect,
    restart,
    isFinished,
  } = useExamSimulator({ questions });

  if (state === 'select-theme') {
    return (
      <SimulatorContainer>
        <h1>Seleccionar tema</h1>
        {themes.length > 0 ? (
          <>
            <p>Elige el tema que deseas practicar:</p>
            <ThemeGrid>
              {themes.map((t) => (
                <Button key={t} variant="secondary" onClick={() => selectTheme(t)}>
                  {t}
                </Button>
              ))}
            </ThemeGrid>
          </>
        ) : (
          <p>No hay preguntas para practicar. Importa un archivo Excel primero.</p>
        )}
      </SimulatorContainer>
    );
  }

  if (isFinished) {
    return (
      <SimulatorContainer>
        <ResultsContainer>
          <BigPercentage>{percentage} %</BigPercentage>
          <p>Simulacro finalizado</p>
          <StatsRow>
            <StatItem>
              <span>Correctas</span>
              <StatValue>{correctAnswers}</StatValue>
            </StatItem>
            <StatItem>
              <span>Incorrectas</span>
              <StatValue>{incorrectAnswers}</StatValue>
            </StatItem>
            <StatItem>
              <span>Totales</span>
              <StatValue>{totalQuestions}</StatValue>
            </StatItem>
          </StatsRow>
          {canRetryIncorrect && (
            <Button variant="secondary" onClick={retryIncorrect}>
              Practicar incorrectas
            </Button>
          )}
          <Button onClick={restart}>Nuevo simulacro</Button>
        </ResultsContainer>
      </SimulatorContainer>
    );
  }

  const progress = ((currentIndex) / Math.max(totalQuestions, 1)) * 100;

  return (
    <SimulatorContainer>
      <h1>{theme}</h1>
      <ProgressBar percent={progress}>
        <ProgressFill percent={progress} />
      </ProgressBar>
      <StatsRow>
        <StatItem>
          <span>Pregunta</span>
          <StatValue>{currentIndex + 1} / {totalQuestions}</StatValue>
        </StatItem>
      </StatsRow>

      <QuestionContainer>
        <QuestionCard
          question={{
            id: currentQuestion!.id,
            text: currentQuestion!.text,
            correctOption: currentQuestion!.correctOption,
            options: currentQuestion!.options,
          }}
          onAnswer={confirmAnswer}
        />
      </QuestionContainer>

      {state === 'feedback' && (
        <Button onClick={nextQuestion}>Siguiente pregunta</Button>
      )}
    </SimulatorContainer>
  );
}
