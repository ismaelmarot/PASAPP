import styled, { keyframes } from 'styled-components';
import { spacing } from '@/styles';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: var(--color-bg);
  color: var(--color-text-primary);
  animation: ${fadeIn} 0.5s ease;
  cursor: pointer;
`;

export const AppIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-bottom: ${spacing.lg};
  color: var(--color-accent);
  background: var(--color-accent-soft);
  border: 1px solid var(--color-border);
  border-radius: 22px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${scaleIn} 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const AppName = styled.h2`
  margin: 0 0 ${spacing.xxl} 0;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(
    90deg,
    var(--color-text-primary) 0%,
    var(--color-text-primary) 40%,
    var(--color-text-tertiary) 50%,
    var(--color-text-primary) 60%,
    var(--color-text-primary) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${slideUp} 0.8s ease 0.2s both, ${shimmer} 4s ease-in-out infinite;
`;

export const USP = styled.p`
  max-width: 320px;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
`;

export const AnimatedLetter = styled.span<{ $visible: boolean }>`
  color: ${(p) => (p.$visible ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)')};
  transition: color 0.1s ease;
`;

export const LoadingDots = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.xxl};
  animation: ${slideUp} 0.8s ease 1s both;
`;

export const Dot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-text-primary);
  opacity: 0.6;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
`;

export const AppVersion = styled.span`
  position: absolute;
  bottom: 60px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const Developer = styled.span`
  position: absolute;
  bottom: 40px;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-tertiary);
`;
