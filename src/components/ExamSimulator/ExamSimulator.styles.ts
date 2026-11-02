import styled from 'styled-components';

export const SimulatorContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 1rem;
`;

export const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ProgressBar = styled.div<{ percent: number }>`
  height: 0.5rem;
  background: #e5e5ea;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  background: #0066cc;
  width: ${(p) => p.percent}%;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9375rem;
  color: #1d1d1f;
  margin-bottom: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const QuestionContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const FeedbackBox = styled.div<{ correct?: boolean }>`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(p) => (p.correct ? '#f0fff4' : '#fff0f0')};
  border: 1px solid ${(p) => (p.correct ? '#34c759' : '#ff3b30')};
  color: ${(p) => (p.correct ? '#34c759' : '#ff3b30')};
  margin-bottom: 1.5rem;
`;

export const ComplementaryBox = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  margin-bottom: 1.5rem;
`;

export const ComplementaryTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ComplementaryItem = styled.div`
  font-size: 0.9375rem;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`;

export const DocRef = styled.span`
  font-size: 0.8125rem;
  color: #0066cc;
`;

export const ResultsContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

export const BigPercentage = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 0.5rem;
`;
