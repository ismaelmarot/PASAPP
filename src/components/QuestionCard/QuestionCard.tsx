import { Container, QuestionText, OptionsGrid, OptionButton, Feedback } from './QuestionCard.styles';
import { useQuestionCard } from './useQuestionCard';

export interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    options: Array<{ id: string; text: string; option: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
    correctOption: 'A' | 'B' | 'C' | 'D';
  };
  onAnswer: (selectedOption: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const { selectOption, confirmAnswer, isSelected, isDisabled, confirmed, selectedOption } = useQuestionCard({
    options: question.options,
    onAnswer,
  });

  const correctOption = question.options.find((o) => o.option === question.correctOption);

  return (
    <Container>
      <QuestionText>{question.text}</QuestionText>
      <OptionsGrid>
        {question.options.map((opt) => (
          <OptionButton
            key={opt.id}
            selected={isSelected(opt.option)}
            correct={confirmed && opt.option === question.correctOption}
            disabled={isDisabled()}
            onClick={() => {
              selectOption(opt.option);
              confirmAnswer(opt.option);
            }}
          >
            {opt.option}. {opt.text}
          </OptionButton>
        ))}
      </OptionsGrid>
      {confirmed && selectedOption && correctOption && (
        <Feedback correct={selectedOption === question.correctOption}>
          {selectedOption === question.correctOption
            ? 'Respuesta correcta'
            : `Incorrecto. La respuesta correcta es ${question.correctOption}.`}
        </Feedback>
      )}
    </Container>
  );
}
