import { useThemeStore } from '../../store/themeStore';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={`w-11 h-11 flex items-center justify-center rounded-neo bg-neo-light text-neo-dark shadow-neo-button transition-all duration-200 hover:shadow-neo-lg active:shadow-neo-button-pressed ${className}`}
    >
      <span className="text-xl leading-none">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
