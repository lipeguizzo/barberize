import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UnauthenticatedHeader } from '../components/unauthenticated/header';
import { UnauthenticatedFooter } from '../components/unauthenticated/footer';
import { UnauthenticatedContainer } from '../components/unauthenticated/container';

export function Unauthenticated() {
  const { authenticated } = useAuth();

  if (authenticated) return <Navigate to="/" replace />;

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      position="relative"
      bgcolor="background"
    >
      <UnauthenticatedHeader />

      <UnauthenticatedContainer>
        <Outlet />
      </UnauthenticatedContainer>

      <UnauthenticatedFooter />
    </Stack>
  );
}
