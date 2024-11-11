/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { IOption } from '@/shared/domain/interfaces/option.interface';
import { AddressRepository } from '@/shared/repositories/address.repository';
import { formatErrorForNotification } from '@/shared/utils/error';
import { toast } from 'react-toastify';
import { ControlledAutocomplete } from './controlled-autocomplete';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, false, false, false>,
      | 'defaultValue'
      | 'name'
      | 'renderInput'
      | 'options'
      | 'getOptionLabel'
      | 'isOptionEqualToValue'
    > {
  state: string;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

export function ControlledCity({
  state = '',
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const addressRepository = new AddressRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [cities, setCities] = useState<IOption[]>([]);

  async function getCities() {
    if (loading) return;

    try {
      setLoading(true);

      const data = await addressRepository.findCity(state);

      setCities(
        data.map((city) => ({
          label: city.name,
          value: city.name,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCities();
  }, [state]);

  return (
    <ControlledAutocomplete
      {...props}
      options={cities}
      loading={loading}
      label={label}
      variant={variant}
      color={color}
      translate={null}
    />
  );
}
