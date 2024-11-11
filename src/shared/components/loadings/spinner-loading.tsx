import { Box, CircularProgress } from '@mui/material';

interface SpinnerLoadingProps {
  loading: boolean;
}

export function SpinnerLoading({ loading }: SpinnerLoadingProps) {
  return (
    loading && (
      <Box
        position="fixed"
        left={0}
        top={0}
        justifyContent="center"
        alignItems="center"
        display="flex"
        padding="24px"
        width="100%"
        height="100%"
        bgcolor="rgba(0, 0, 0, 0.5)"
        zIndex={1}
      >
        <CircularProgress size="3rem" color="secondary" />
      </Box>
    )
  );
}
