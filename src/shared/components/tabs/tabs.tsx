import { Box, Tabs as MuiTabs, Tab } from '@mui/material';
import { ReactNode, SyntheticEvent } from 'react';

interface Props {
  tabs: string[];
  children: ReactNode;
  value: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
}

export function Tabs({ tabs, value, handleChange, children }: Props) {
  return (
    <Box>
      <MuiTabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabs.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </MuiTabs>
      {children}
    </Box>
  );
}
