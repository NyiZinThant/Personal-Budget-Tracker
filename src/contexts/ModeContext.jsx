import { useColorScheme } from '@mui/material';
import { createContext, useContext } from 'react';

const ModeContext = createContext(null);
const SetModeContext = createContext(null);

export function ModeProvider({ children }) {
  const { mode, setMode } = useColorScheme();
  //   if (!mode) return null;
  return (
    <ModeContext.Provider value={mode}>
      <SetModeContext.Provider value={setMode}>
        {children}
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
