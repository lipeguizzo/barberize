/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRating } from '@/shared/domain/interfaces/rating.interface';
import { Box, Rating, RatingProps, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
    Omit<RatingProps, 'defaultValue' | 'name'> {
  position?: 'left' | 'center' | 'right';
}

export function ControlledRating({
  position = 'left',
  size = 'large',
  ...props
}: Props) {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController(props);
  const [value, setValue] = useState<number>(0);

  function handleChange(data: number) {
    setValue(data);
    onChange(data);
  }

  const labels: { [score: number]: IRating } = {
    1: { label: 'Horrível', color: 'error' },
    2: { label: 'Ruim', color: 'warning' },
    3: { label: 'Ok', color: 'primary' },
    4: { label: 'Bom', color: 'info' },
    5: { label: 'Excelente', color: 'success' },
  };

  const selectedLabel: IRating = labels[value];

  return (
    <Stack>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: position,
          gap: 2,
        }}
      >
        <Typography variant="h6" color="primary">
          Avaliação
        </Typography>
        <Rating
          {...props}
          {...field}
          size={size}
          value={value}
          onChange={(_event, newValue) => {
            handleChange(Number(newValue));
          }}
        />
        {field.value > 0 && field.value < 6 && (
          <Typography variant="body1" color={selectedLabel.color ?? 'primary'}>
            {selectedLabel.label}
          </Typography>
        )}
      </Box>
      {error && (
        <Typography variant="body1" color="error">
          {error.message}
        </Typography>
      )}
    </Stack>
  );
}
