/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
    Omit<CheckboxProps, 'defaultValue' | 'name'> {
  label?: ReactNode;
  message?: string;
}

export function ControlledCheckbox({ label, message, color, ...props }: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <Box>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            {...field}
            color={color}
            checked={field.value ? true : false}
          />
        }
      />

      {error && (
        <Typography variant="body1" color={'error'}>
          {message ?? error.message}
        </Typography>
      )}
    </Box>
  );
}
