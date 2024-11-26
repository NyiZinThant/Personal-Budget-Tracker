import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { ModeProvider } from './contexts/ModeContext';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#eaeaea',
    },
    secondary: {
      main: '#4747d6',
    },
  },
});
function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModeProvider>
        <App />
      </ModeProvider>
    </ThemeProvider>
  );
}

export default ThemedApp;
