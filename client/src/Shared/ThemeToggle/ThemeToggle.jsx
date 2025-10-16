import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='size-10 flex items-center justify-center rounded-full bg-PrimaryColor-0 dark:bg-green-600 text-white hover:bg-opacity-90 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group'
      aria-label='Toggle theme'
    >
      {/* Background pulse effect */}
      <span className='absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300'></span>

      {/* Icons with rotation animation */}
      {theme === 'light' ? (
        <FaSun
          size={18}
          className='animate-[rotateIn_0.6s_ease-in-out] transition-transform group-hover:rotate-180'
        />
      ) : (
        <FaMoon
          size={18}
          className='animate-[rotateIn_0.6s_ease-in-out] transition-transform group-hover:rotate-12'
        />
      )}
    </button>
  );
};

export default ThemeToggle;
