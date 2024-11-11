/* eslint-disable @typescript-eslint/no-explicit-any */
import AlarmIcon from '@mui/icons-material/Alarm';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { IMask, IMaskInput } from 'react-imask';

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
        value={hasValue ? `${value}` : ''}
        mask="HH:mm"
        blocks={{
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
            maxLength: 2,
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            maxLength: 2,
          },
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
      />
    );
  },
);

export function ControlledTime({
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
            maxLength: 5,
          },
          endAdornment: (
            <IconButton color={color}>
              <AlarmIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          ),
        },
      }}
    />
  );
}
