/* eslint-disable @typescript-eslint/no-explicit-any */
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

const TextMask = forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '0': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
      />
    );
  },
);

export function ControlledPhone({
  label = '',
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
      label={label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          inputComponent: TextMask,
          inputProps: {
            maxLength: 16,
          },
          endAdornment: (
            <IconButton color={color}>
              <LocalPhoneIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          ),
        },
      }}
    />
  );
}
