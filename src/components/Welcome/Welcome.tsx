import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  Container,
  AppIcon,
  AppName,
  USP,
  AnimatedLetter,
  LoadingDots,
  Dot,
  AppVersion,
  Developer,
} from './Welcome.styles';
import { Icon } from '@/components/Icon';

const USP_TEXT = 'Practica con simulacros inspirados en el examen de Productor Asesor de Seguros.';

export interface WelcomeProps {
  onEnter: () => void;
}

export function Welcome({ onEnter }: WelcomeProps): JSX.Element {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= USP_TEXT.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onEnter();
    }
  };

  return (
    <Container
      onClick={onEnter}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Ingresar a PASAPP"
    >
      <AppIcon>
        <Icon name="book" size={56} />
      </AppIcon>
      <AppName>PASAPP</AppName>
      <USP>
        {USP_TEXT.split('').map((letter, index) => (
          <AnimatedLetter key={index} $visible={index < visibleLetters}>
            {letter}
          </AnimatedLetter>
        ))}
      </USP>
      <LoadingDots>
        <Dot $delay={0} />
        <Dot $delay={0.2} />
        <Dot $delay={0.4} />
      </LoadingDots>
      <AppVersion>v 1.0.0 Stable</AppVersion>
      <Developer>Desarrollado por Ismael Marot</Developer>
    </Container>
  );
}
