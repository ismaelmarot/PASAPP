import { NavContainer, NavList, NavItemButton } from './Nav.styles';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon';

export interface NavItem {
  key: string;
  label: string;
  icon: IconName;
}

export interface NavProps {
  items: NavItem[];
  active: string;
  onNavigate: (key: string) => void;
}

export function Nav({ items, active, onNavigate }: NavProps): JSX.Element {
  return (
    <NavContainer>
      <NavList>
        {items.map((item) => (
          <NavItemButton
            key={item.key}
            type="button"
            $active={item.key === active}
            aria-current={item.key === active ? 'page' : undefined}
            onClick={() => onNavigate(item.key)}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </NavItemButton>
        ))}
      </NavList>
    </NavContainer>
  );
}
