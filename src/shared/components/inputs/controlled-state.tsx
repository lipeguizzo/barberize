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
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

export function ControlledState({
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const addressRepository = new AddressRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [states, setStates] = useState<IOption[]>([]);

  async function getStates() {
    if (loading) return;

    try {
      setLoading(true);

      const data = await addressRepository.findStates();

      setStates(
        data.map((state) => ({
          label: state.name,
          value: state.acronym,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStates();
  }, []);

  return (
    <ControlledAutocomplete
      {...props}
      options={states}
      loading={loading}
      label={label}
      variant={variant}
      color={color}
      translate={null}
    />
  );
}
