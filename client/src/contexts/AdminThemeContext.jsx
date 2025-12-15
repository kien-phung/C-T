import { createContext, useContext, useEffect, useState } from 'react';

const AdminThemeContext = createContext();

export const useAdminTheme = () => {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error('useAdminTheme must be used within AdminThemeProvider');
  return ctx;
};

export const AdminThemeProvider = ({ children }) => {
  const [adminTheme, setAdminTheme] = useState(() => {
    const saved = localStorage.getItem('adminTheme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('adminTheme', adminTheme);
  }, [adminTheme]);

  const toggleAdminTheme = () => {
    setAdminTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AdminThemeContext.Provider value={{ adminTheme, toggleAdminTheme }}>
      <div className={adminTheme === 'dark' ? 'dark' : ''}>{children}</div>
    </AdminThemeContext.Provider>
  );
};