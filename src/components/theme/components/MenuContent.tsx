import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import { Link, matchPath, useLocation } from 'react-router';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Measurements', icon: <AnalyticsRoundedIcon />, path: '/measurements' },
  { text: 'Weights', icon: <ScaleRoundedIcon />, path: '/clients' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
];

export default function MenuContent() {
  const { pathname } = useLocation()

  const activeLink = useCallback((path: string, deep = true) => {
    const normalActive = path ? pathname.includes(path) : false
    const deepActive = path ? !!matchPath({ path, end: false }, pathname) : false
    return deep ? deepActive : normalActive
  }, [pathname])

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <Link to={item.path} key={index} style={{ all: 'unset' }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={activeLink(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={activeLink(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
