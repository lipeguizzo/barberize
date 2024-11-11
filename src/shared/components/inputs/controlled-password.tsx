/* eslint-disable @typescript-eslint/no-explicit-any */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

export function ControlledPassword({
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const [visibility, setVisibility] = useState<boolean>(false);

  function handleShowPassword() {
    setVisibility(!visibility);
  }

  return (
    <TextField
      {...props}
      {...field}
      label={props.label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      type={visibility ? 'text' : 'password'}
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton color={color} onClick={handleShowPassword}>
              {visibility ? (
                <Visibility sx={{ fontSize: '30px' }} />
              ) : (
                <VisibilityOff sx={{ fontSize: '30px' }} />
              )}
            </IconButton>
          ),
        },
      }}
    />
  );
}
