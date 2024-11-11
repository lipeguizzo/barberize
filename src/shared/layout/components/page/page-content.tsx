import { Paper } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PageContent({ children }: Props) {
  return (
    <Paper
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        borderRadius: 2,
        padding: 1,
        minHeight: '700px',
      }}
    >
      {children}
    </Paper>
  );
}
