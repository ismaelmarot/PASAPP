import styled from 'styled-components';

export const IconRoot = styled.svg<{ $size?: number }>`
  width: ${(p) => (p.$size ?? 20)}px;
  height: ${(p) => (p.$size ?? 20)}px;
  display: inline-block;
  flex-shrink: 0;
`;
