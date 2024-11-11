import { AssessmentDialogProvider } from '@/shared/contexts/assessment-dialog';
import { ConfirmDialogProvider } from '@/shared/contexts/confirm-dialog';
import { UserAbilityProvider } from '@/shared/contexts/user-ability';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthenticatedFooter } from '../components/authenticated/footer';
import { AuthenticatedHeader } from '../components/authenticated/header';
import { AuthenticatedSidebar } from '../components/authenticated/sidebar';

export function Authenticated() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <UserAbilityProvider>
      <ConfirmDialogProvider>
        <AssessmentDialogProvider>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
          >
            <AuthenticatedHeader />

            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {open
                ? !isMobile && (
                    <Box
                      component="aside"
                      sx={{
                        width: '150px',
                        height: '80vh',
                        position: 'sticky',
                        top: '120px',
                      }}
                    >
                      <AuthenticatedSidebar />
                      <IconButton
                        color="secondary"
                        onClick={toggleDrawer(false)}
                        sx={{
                          backgroundColor: 'primary.main',
                          ':hover': { backgroundColor: 'primary.main' },
                          width: '30px',
                          height: '30px',
                          position: 'absolute',
                          top: '50%',
                          right: '25px',
                          borderRadius: '50px',
                        }}
                      >
                        <NavigateBefore />
                      </IconButton>
                    </Box>
                  )
                : !isMobile && (
                    <Box
                      component="aside"
                      sx={{
                        width: '40px',
                        height: '80vh',
                        position: 'sticky',
                        top: '120px',
                      }}
                    >
                      <IconButton
                        color="secondary"
                        onClick={toggleDrawer(true)}
                        sx={{
                          backgroundColor: 'primary.main',
                          ':hover': { backgroundColor: 'primary.main' },
                          width: '30px',
                          height: '30px',
                          position: 'absolute',
                          top: '50%',
                          right: '5px',
                          borderRadius: '50px',
                        }}
                      >
                        <NavigateNext />
                      </IconButton>
                    </Box>
                  )}

              <Box
                component="main"
                sx={{
                  width: '100%',
                  backgroundColor: 'background.default',
                }}
              >
                <Outlet />
              </Box>
            </Box>

            <AuthenticatedFooter />
          </Box>
        </AssessmentDialogProvider>
      </ConfirmDialogProvider>
    </UserAbilityProvider>
  );
}
