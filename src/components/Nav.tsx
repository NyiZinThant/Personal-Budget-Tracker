import { cloneElement, ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { ToggleButton, useScrollTrigger } from '@mui/material';
import { useMode, useSetMode } from '../contexts/ModeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
const drawerWidth = 240;
const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Add Transaction', link: '/add' },
];
type Props = {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
};
function ElevationScroll({ children, window }: Props) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}
export default function Nav(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const mode = useMode();
  const setMode = useSetMode();
  let buttonTextColor = mode === 'light' ? '#000' : '#fff';
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Personal Budget Tracker
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => navigate(item.link)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: '50%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => {
              if (!setMode) return;
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }}
          >
            {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Personal Budget Tracker
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: buttonTextColor }}
                  onClick={() => navigate(item.link)}
                >
                  {item.label}
                </Button>
              ))}
              <ToggleButton
                value="dark"
                selected={mode === 'dark'}
                sx={{ borderRadius: '50%' }}
                onChange={() => {
                  if (!setMode) return;
                  setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                  );
                }}
              >
                {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
              </ToggleButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}
