import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='size-10 flex items-center justify-center rounded-full bg-PrimaryColor-0 text-white hover:bg-opacity-90 transition-all duration-300'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};

export default ThemeToggle;
