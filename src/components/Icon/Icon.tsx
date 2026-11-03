import { IconRoot } from './Icon.styles';

export type IconName =
  | 'home'
  | 'book'
  | 'clipboard'
  | 'layers'
  | 'chart'
  | 'check'
  | 'x'
  | 'play'
  | 'trash'
  | 'arrowRight'
  | 'bookOpen'
  | 'fileText'
  | 'clock'
  | 'target';

const iconPaths: Record<IconName, string[]> = {
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  book: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z'],
  layers: ['M12 2l8.5 5v10L12 22l-8.5-5V7z', 'M2.5 5.5l8.5 5 8.5-5', 'M2.5 12l8.5 5 8.5-5'],
  chart: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  check: ['M20 6L9 17l-5-5'],
  x: ['M18 6L6 18', 'M6 6l12 12'],
  play: ['M5 3l14 9-14 9V3z'],
  trash: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  bookOpen: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  fileText: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'],
  clock: ['M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z', 'M12 6v6l4 2'],
  target: ['M22 12h-4l-3 9L9 3l-3 9H2', 'M12 8v4', 'M12 16h.01'],
};

export interface IconProps {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20 }: IconProps): JSX.Element {
  const d = iconPaths[name];
  return (
    <IconRoot $size={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </IconRoot>
  );
}
