import styled from 'styled-components';

export const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 0.9375rem;
  color: #6e6e73;
  margin-bottom: 1rem;
`;

export const FileInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: #1d1d1f;
`;

export const ResultError = styled.p`
  color: #ff3b30;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;
