import styled from 'styled-components';

interface MaterialItemProps {
  category: 'ley' | 'apunte' | 'preguntas';
}

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const CategorySection = styled.section`
  margin-bottom: 2rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e5ea;
  padding-bottom: 0.5rem;
`;

export const MaterialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MaterialItem = styled.div<MaterialItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1rem;
  background: #ffffff;
  border: 1px solid #d2d2d7;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  &:active {
    background: #f5f5f7;
  }
`;

export const MaterialName = styled.span`
  font-size: 1rem;
  color: #1d1d1f;
`;

export const CategoryBadge = styled.span<MaterialItemProps>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.1875rem 0.625rem;
  border-radius: 0.25rem;
  background: ${(p) => {
    switch (p.category) {
      case 'ley': return '#e8f0ff';
      case 'apunte': return '#f0fff4';
      case 'preguntas': return '#fff0f0';
      default: return '#f5f5f7';
    }
  }};
  color: ${(p) => {
    switch (p.category) {
      case 'ley': return '#0066cc';
      case 'apunte': return '#34c759';
      case 'preguntas': return '#ff3b30';
      default: return '#1d1d1f';
    }
  }};
`;

export const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6e6e73;
`;
