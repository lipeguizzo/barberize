import { Stack, Theme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PageButtons({ children }: Props) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Stack
      width="100%"
      flexWrap="wrap"
      justifyContent={isMobile ? 'start' : 'end'}
      direction="row"
      gap={2}
    >
      {children}
    </Stack>
  );
}
