/* eslint-disable @typescript-eslint/no-explicit-any */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
        mask="dd-MM"
        blocks={{
          dd: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
        hidden
      />
    );
  },
);

export function ControlledDayMonth({
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
              <CalendarMonthIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          ),
        },
      }}
    />
  );
}
