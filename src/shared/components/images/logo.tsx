import { Box } from '@mui/material';
import logo from '@/shared/assets/barberize-white-logo.png';

export function Logo() {
  return (
    <Box
      component="img"
      sx={{
        height: 100,
        width: 150,
        objectFit: 'contain',
        padding: 2,
      }}
      alt="logo"
      src={logo}
    />
  );
}
