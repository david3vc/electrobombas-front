import { useCallback, useEffect, useState } from 'react';

const SIDEBAR_STORAGE_KEY = 'adminHMD.sidebarMini';
const THEME_STORAGE_KEY = 'adminHMD.colorTheme';
const DESKTOP_QUERY = '(min-width: 992px)';

type Theme = 'light' | 'dark';

function isDesktop(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function readStoredMini(): boolean {
  try {
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function readPreferredTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* localStorage no disponible */
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Hook que centraliza el comportamiento del "shell" de adminHMD:
 * - sidebar en modo "mini" (colapsado) en escritorio, persistido en localStorage
 * - sidebar abierto/cerrado como overlay en mobile
 * - tema claro/oscuro, persistido en localStorage y reflejado en <html data-theme>
 *
 * Reemplaza 1:1 la lógica que en la plantilla original vivía en assets/js/main.js.
 */
export function useAdminShell() {
  const [sidebarMini, setSidebarMini] = useState<boolean>(() => readStoredMini() && isDesktop());
  const [sidebarOpen, setSidebarOpen] = useState(false); // solo aplica en mobile
  const [theme, setTheme] = useState<Theme>(() => readPreferredTheme());

  // Persistir "mini" y limpiar estado incoherente al cruzar el breakpoint desktop/mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const handleChange = () => {
      if (isDesktop()) {
        setSidebarOpen(false);
        setSidebarMini(readStoredMini());
      } else {
        setSidebarMini(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarMini));
    } catch {
      /* localStorage no disponible, se ignora */
    }
  }, [sidebarMini]);

  // Aplicar el tema al documento + persistirlo
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* localStorage no disponible, se ignora */
    }
  }, [theme]);

  const toggleSidebar = useCallback(() => {
    if (isDesktop()) {
      setSidebarMini((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  }, []);

  const closeMobileSidebar = useCallback(() => {
    if (!isDesktop()) setSidebarOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    sidebarMini,
    sidebarOpen,
    theme,
    toggleSidebar,
    closeMobileSidebar,
    toggleTheme,
  };
}
