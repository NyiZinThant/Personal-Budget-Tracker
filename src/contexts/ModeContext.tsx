import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

const ModeContext = createContext<PaletteMode | null>(null);
const SetModeContext = createContext<Dispatch<
  SetStateAction<PaletteMode>
> | null>(null);

type ModeProviderType = {
  children: ReactNode;
};
export function ModeProvider({ children }: ModeProviderType) {
  const [mode, setMode] = useState<PaletteMode>('dark');
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
