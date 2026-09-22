import { create } from 'zustand';

const STORAGE_KEY = 'theme';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

// index.html sets the initial class synchronously (avoids a flash of the
// wrong theme); this just reads that same decision back into React state.
const getInitialTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable (private mode, etc.) - theme just won't persist
    }
    set({ theme });
  },

  toggleTheme: () => {
    get().setTheme(get().theme === 'dark' ? 'light' : 'dark');
  },
}));
