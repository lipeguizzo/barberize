import { Logo } from '@/shared/components/images/logo';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import MenuRounded from '@mui/icons-material/MenuRounded';
import WhatsApp from '@mui/icons-material/WhatsApp';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from '@mui/material';
import { ReactNode, useState } from 'react';

interface ILink {
  icon: ReactNode;
  url?: string;
}

export function UnauthenticatedHeader() {
  const links: Array<ILink> = [
    {
      icon: (
        <FacebookOutlined
          sx={{
            fontSize: '40px',
            color: 'secondary.main',
          }}
        />
      ),
      url: import.meta.env.VITE_FACEBOOK,
    },
    {
      icon: (
        <WhatsApp
          sx={{
            fontSize: '40px',
            color: 'secondary.main',
          }}
        />
      ),
      url: import.meta.env.VITE_WHATSAPP,
    },
    {
      icon: (
        <Instagram
          sx={{
            fontSize: '40px',
            color: 'secondary.main',
          }}
        />
      ),
      url: import.meta.env.VITE_INSTAGRAM,
    },
  ];

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="primary.main"
    >
      <List>
        <ListItem>
          {links.map(
            ({ icon, url }, index) =>
              url && (
                <ListItemButton
                  key={index}
                  href={url}
                  target="_blank"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemButton>
              ),
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Logo />

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {links.map(
              ({ icon, url }, index) =>
                url && (
                  <Button
                    key={index}
                    LinkComponent={Link}
                    href={url}
                    target="_blank"
                    variant="text"
                    color="primary"
                  >
                    {icon}
                  </Button>
                ),
            )}
          </Box>

          <IconButton
            sx={{ display: { sm: 'block', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuRounded
              sx={{
                fontSize: '40px',
                color: 'secondary.main',
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}
