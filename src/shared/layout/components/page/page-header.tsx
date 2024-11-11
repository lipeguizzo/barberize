import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PageHeader({ children }: Props) {
  return (
    <Stack
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      padding={2}
      gap={3}
    >
      {children}
    </Stack>
  );
}
