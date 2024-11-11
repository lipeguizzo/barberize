/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  icon?: ReactNode;
}

export function ControlledText({
  label = '',
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  icon = null,
  ...props
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...props}
      {...field}
      label={label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          endAdornment: icon && <IconButton color={color}>{icon}</IconButton>,
        },
      }}
    />
  );
}
