import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
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
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeaderProfile } from './header-profile';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { useAuth } from '@/modules/auth/hooks/use-auth';

interface ILink {
  icon: ReactNode;
  url?: string;
}

export function AuthenticatedHeader() {
  const navigate = useNavigate();
  const { abilities } = useAuth();

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

  function handleNavigate(path: string) {
    navigate(path);
  }

  const userAbilities = abilities ?? [];

  function verifyAbility(code?: EAbilityCode): boolean {
    return code
      ? userAbilities.some((ability: AbilityEntity) => ability.code === code)
      : true;
  }

  const drawerContent = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="primary.main"
    >
      <List>
        {authenticatedRoutes
          .filter((route) => !route.hidden)
          .map(
            ({ name, path, ability }, index) =>
              verifyAbility(ability) && (
                <ListItemButton
                  key={index}
                  onClick={() => handleNavigate(path ?? '')}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'secondary.main',
                  }}
                >
                  {name?.toUpperCase()}
                </ListItemButton>
              ),
          )}
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
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
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

          <AuthenticatedHeaderProfile />
        </Toolbar>
      </AppBar>

      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}
