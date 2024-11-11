import { Stack, Typography } from '@mui/material';

interface Props {
  title: string;
  description?: string;
}

export function UnauthenticatedContainerHeader({ title, description }: Props) {
  return (
    <Stack width="100%" gap={1} alignItems="center">
      <Typography variant="h4" component="h2" color="text.primary">
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body1"
          component="p"
          color="text.secondary"
          align="center"
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
}
