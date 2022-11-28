import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import {
  Collections,
  Menu,
  Person,
  Yard,
  AdminPanelSettingsSharp,
  LocalFlorist,
  ContactPage,
  Home,
  Phone,
} from '@mui/icons-material';
import { blue, yellow } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const drawerWidth = '95%';
const items = [
  { name: 'Головна', icon: <Home />, nav: '' },
  { name: 'Галереї', icon: <Collections />, nav: 'gallery' },
  { name: 'Контакти', icon: <ContactPage />, nav: 'contacts' },
  { name: 'Як доглядати', icon: <LocalFlorist />, nav: 'care' },
  { name: 'Як замовити', icon: <Yard />, nav: 'order' },
  { name: 'Адмін', icon: <AdminPanelSettingsSharp />, nav: 'admin' },
  { name: 'Увійти', icon: <Person />, nav: 'auth' },
];

const NavBarTop = observer(() => {
  let window;
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    store.setPage(location.pathname);
  }, [store, location.pathname]);

  const drawer = (
    <Box sx={{ bgcolor: blue[700] }}>
      <List>
        {items.map((item) => (
          <Box key={item.name}>
            <ListItemButton
              sx={{
                background: store.page === '/' + item.nav ? blue[800] : '',
              }}
              onClick={() => {
                navigate('/' + item.nav);
                store.setPage(item.nav);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon sx={{ color: yellow[500] }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ color: yellow[500] }} primary={item.name} />
            </ListItemButton>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='static'>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-around',
            p: 0.3,
          }}
        >
          <IconButton sx={{ color: yellow[500] }} onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
          <Box sx={{ display: 'flex', color: yellow[500] }}>
            <Phone fontSize='small' sx={{ mt: 1.3 }} />
            <Typography
              variant='h6'
              sx={{ mt: 0.5, ml: 0.5, color: yellow[500] }}
            >
              +38 (066) 611 74 28
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-around',
            p: 1,
          }}
        >
          {items.map((item, index) => (
            <Button
              key={item.name}
              variant='contained'
              startIcon={item.icon}
              sx={{
                color: yellow[500],
                background: store.page === '/' + item.nav ? blue[800] : '',
                display:
                  index > 2 && index < 6 ? { sm: 'none', md: 'flex' } : '',
              }}
              onClick={() => {
                navigate('/' + item.nav);
                store.setPage(item.nav);
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
});

export default NavBarTop;
