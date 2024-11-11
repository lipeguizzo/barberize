/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchRounded from '@mui/icons-material/SearchRounded';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

export function ControlledSearch({
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

  return (
    <TextField
      {...props}
      {...field}
      label={props.label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      type="text"
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton color={color}>
              <SearchRounded sx={{ fontSize: '30px' }} />
            </IconButton>
          ),
        },
      }}
    />
  );
}
