import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function UnauthenticatedContainer({ children }: Props) {
  const { pathname } = useLocation();

  const isSignUp = pathname.replace('/', '') === EUnauthenticatedPath.REGISTER;

  const maxWidth = isSignUp ? '800px' : '600px';

  return (
    <Paper
      component="main"
      elevation={2}
      sx={{
        width: { md: '100%', sm: '80%' },
        maxWidth: maxWidth,
        borderRadius: 2,
      }}
    >
      <Box
        justifyContent="center"
        flexDirection="column"
        maxWidth={maxWidth}
        display="flex"
        padding="24px"
        width="100%"
        gap={3}
      >
        {children}
      </Box>
    </Paper>
  );
}
