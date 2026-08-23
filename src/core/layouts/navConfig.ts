export interface NavItem {
  label: string;
  path: string;
  icon: string; // clase de Bootstrap Icons, ej. "bi-speedometer2"
}

export const navItems: NavItem[] = [
  { label: 'Mantenimientos', path: '/mantenimientos', icon: 'bi-people' },
  { label: 'Pozos', path: '/pozos', icon: 'bi-people' },
];
