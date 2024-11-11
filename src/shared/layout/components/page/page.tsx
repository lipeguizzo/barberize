import { Box, Theme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Page({ children }: Props) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return <Box width={isMobile ? '100%' : 'calc(100% - 50px)'}>{children}</Box>;
}
