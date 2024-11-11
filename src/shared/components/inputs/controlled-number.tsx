/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from '@mui/material';
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
        mask={Number}
        inputRef={ref}
        thousandsSeparator="."
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
      />
    );
  },
);

export function ControlledNumber({
  label = '',
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController(props);

  const hasValue = value !== undefined && value !== null;

  return (
    <TextField
      {...props}
      {...field}
      value={hasValue ? `${value}` : ''}
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
        },
      }}
    />
  );
}
