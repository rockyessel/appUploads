import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface ThemeContextProps {
  handleThemeSwitch: () => void;
}

// Create a theme context with a default value
const ThemeContext = React.createContext<ThemeContextProps>({
  handleThemeSwitch: () => {
    return;
  },
});

// Theme context provider component
export const ThemeContextProvider: React.FC<Props> = (props) => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = { handleThemeSwitch };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = (): ThemeContextProps =>
  React.useContext(ThemeContext);
