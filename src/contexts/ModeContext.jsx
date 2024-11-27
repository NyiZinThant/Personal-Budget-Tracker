import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useContext, useState, useMemo } from 'react';

const ModeContext = createContext(null);
const SetModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#eaeaea',
          },
          secondary: {
            main: '#4747d6',
          },
        },
      }),
    [mode]
  );
  return (
    <ModeContext.Provider value={mode}>
      <SetModeContext.Provider value={setMode}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SetModeContext.Provider>
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}

export function useSetMode() {
  return useContext(SetModeContext);
}
