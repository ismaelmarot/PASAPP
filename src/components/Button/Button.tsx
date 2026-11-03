import { Root } from './Button.styles';
import { Icon } from '@/components/Icon';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', disabled = false, loading = false, onClick, children }: ButtonProps): JSX.Element {
  return (
    <Root variant={variant} disabled={disabled || loading} onClick={onClick} type="button" $loading={loading}>
      {loading && <Icon name="play" size={16} />}
      {children}
    </Root>
  );
}
