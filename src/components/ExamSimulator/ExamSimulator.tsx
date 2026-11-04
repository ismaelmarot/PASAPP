import {
  SimulatorContainer,
  ThemeList,
  ThemeOption,
  ThemeCheckbox,
  SimulatorControls,
  ControlRow,
  ControlLabel,
  CountInput,
  ModeSelect,
  ProgressBar,
  ProgressFill,
  StatsRow,
  StatItem,
  StatValue,
  QuestionContainer,
  ResultCard,
  ScoreDisplay,
  ResultTitle,
  ResultSubtitle,
  ResultStatGrid,
  ResultStatCard,
  ResultStatLabel,
  ResultStatValue,
  ActionGroup,
} from './ExamSimulator.styles';
import { Button, QuestionCard } from '@/components';
import { useExamSimulator, QuestionCountMode } from './useExamSimulator';

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
    selectedThemes,
    questionCountMode,
    questionCount,
    currentQuestion,
    currentIndex,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage,
    canRetryIncorrect,
    toggleTheme,
    setQuestionCountMode,
    setQuestionCount,
    start,
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
            <ThemeList>
              {themes.map((t) => (
                <ThemeOption key={t}>
                  <ThemeCheckbox type="checkbox" checked={selectedThemes.includes(t)} onChange={() => toggleTheme(t)} />
                  <span>{t}</span>
                </ThemeOption>
              ))}
            </ThemeList>
            <SimulatorControls>
              <ControlRow>
                <ControlLabel htmlFor="question-count">Cantidad de preguntas:</ControlLabel>
                <CountInput id="question-count" type="number" min={1} max={200} value={questionCount} onChange={(e) => setQuestionCount(Math.max(1, Number(e.target.value) || 1))} />
              </ControlRow>
              <ControlRow>
                <ControlLabel htmlFor="question-count-mode">Modo:</ControlLabel>
                <ModeSelect id="question-count-mode" value={questionCountMode} onChange={(e) => setQuestionCountMode(e.target.value as QuestionCountMode)}>
                  <option value="all">Todas</option>
                  <option value="per-theme">Por tema</option>
                  <option value="total">Total</option>
                </ModeSelect>
              </ControlRow>
            </SimulatorControls>
            <Button onClick={start}>Iniciar simulacro</Button>
          </>
        ) : (
          <p>No hay preguntas para practicar. Importa un archivo Excel primero.</p>
        )}
      </SimulatorContainer>
    );
  }

  if (isFinished) {
    const resultMessage = percentage >= 80 ? '¡Excelente!' : percentage >= 50 ? 'Buen trabajo' : 'Sigue practicando';

    return (
      <SimulatorContainer>
        <ResultCard>
          <ScoreDisplay>{percentage} %</ScoreDisplay>
          <ResultTitle>
            <p>Simulacro finalizado</p>
            <ResultSubtitle>{resultMessage}</ResultSubtitle>
          </ResultTitle>
          <ResultStatGrid>
            <ResultStatCard>
              <ResultStatValue>{correctAnswers}</ResultStatValue>
              <ResultStatLabel>Correctas</ResultStatLabel>
            </ResultStatCard>
            <ResultStatCard>
              <ResultStatValue>{incorrectAnswers}</ResultStatValue>
              <ResultStatLabel>Incorrectas</ResultStatLabel>
            </ResultStatCard>
            <ResultStatCard>
              <ResultStatValue>{totalQuestions}</ResultStatValue>
              <ResultStatLabel>Totales</ResultStatLabel>
            </ResultStatCard>
          </ResultStatGrid>
          <ActionGroup>
            {canRetryIncorrect && (
              <Button variant="secondary" onClick={retryIncorrect}>
                Practicar incorrectas
              </Button>
            )}
            <Button onClick={restart}>Nuevo simulacro</Button>
          </ActionGroup>
        </ResultCard>
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
          key={currentQuestion!.id}
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
