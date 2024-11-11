/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from '@/shared/domain/interfaces/option.interface';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { SpinnerLoading } from '../loadings/spinner-loading';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, any, any, any>,
      'renderInput' | 'translate' | 'onChange' | 'value' | 'options'
    > {
  options: IOption[];
  translate?: Record<string, string> | null;
  label?: string;
  loading?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

export function ControlledAutocomplete({
  translate,
  multiple,
  disabled,
  options = [],
  loading = false,
  label = '',
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const [selectedItem, setSelectedItem] = useState<IOption | null>(null);
  const [selectedItems, setSelectedItems] = useState<IOption[]>([]);

  function handleChange(data: IOption | IOption[] | null) {
    multiple
      ? setSelectedItems((data as IOption[] | null) ?? [])
      : setSelectedItem(data as IOption | null);

    onChange(
      multiple
        ? ((data as IOption[] | null)?.map(({ value }) => value) ?? [])
        : (data as IOption | null)?.value,
    );
  }

  function formatLabel(key: string | null): string {
    if (!key) return '';

    if (translate) return translate[key];

    return key
      .split('_')
      .map((label) => label)
      .join(' ');
  }

  useEffect(() => {
    multiple
      ? setSelectedItems(
          options.filter((option) => value && value.includes(option.value)),
        )
      : setSelectedItem(
          options.find((option) => option.value == value) ?? null,
        );
  }, [multiple, value, options]);

  if (loading)
    return (
      <>
        <SpinnerLoading loading={loading} />
        <TextField
          disabled
          label={label}
          size={size}
          fullWidth={fullWidth}
          variant={variant}
        />
      </>
    );

  if (disabled)
    return (
      <TextField
        disabled
        label={label}
        size={size}
        fullWidth={fullWidth}
        variant={variant}
        error={!!error}
        helperText={error?.message}
      />
    );

  return (
    <Autocomplete
      {...props}
      {...field}
      multiple={multiple}
      options={options}
      value={multiple ? selectedItems : selectedItem}
      onChange={(_, data) => handleChange(data as IOption | IOption[] | null)}
      getOptionLabel={(option) => formatLabel(option.label)}
      isOptionEqualToValue={(option, selected) =>
        option.value == selected.value
      }
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {option?.content ?? formatLabel(option.label)}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size={size}
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
