import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  index: number;
  value: number;
}

export function TabPanel({ children, value, index, ...other }: Props) {
  return (
    <div {...other}>
      {value === index && (
        <Stack gap={2} marginTop={2}>
          {children}
        </Stack>
      )}
    </div>
  );
}
