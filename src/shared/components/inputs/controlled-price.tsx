/* eslint-disable @typescript-eslint/no-explicit-any */
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

const TextMask = forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, value, ...other } = props;

    const hasValue = value !== undefined && value !== null;

    return (
      <IMaskInput
        {...other}
        value={hasValue ? parseFloat(value).toString() : ''}
        mask={Number}
        scale={2}
        padFractionalZeros={false}
        radix="."
        mapToRadix={['.']}
        inputRef={ref}
        onAccept={(value: string) => {
          const numericValue = value ? parseFloat(value).toString() : 0;
          onChange({ target: { name, value: numericValue } });
        }}
      />
    );
  },
);

export function ControlledPrice({
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
          endAdornment: (
            <IconButton color={color}>
              <AttachMoneyIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          ),
        },
      }}
    />
  );
}
