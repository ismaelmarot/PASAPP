import { Root } from './Button.styles';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', disabled = false, onClick, children }: ButtonProps): JSX.Element {
  return (
    <Root variant={variant} disabled={disabled} onClick={onClick} type="button">
      {children}
    </Root>
  );
}
