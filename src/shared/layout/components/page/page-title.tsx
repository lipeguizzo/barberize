import { IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

interface Props {
  title: string;
  backPath?: string;
}

export function PageTitle({ title, backPath }: Props) {
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Stack
      flexGrow={isMobile ? '1' : undefined}
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      {backPath && (
        <IconButton onClick={() => navigate(`/${backPath}`)}>
          <ArrowBack color="secondary" />
        </IconButton>
      )}

      <Typography component="h2" variant="h5">
        {title}
      </Typography>
    </Stack>
  );
}
