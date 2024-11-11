/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { HaircutRepository } from '@/modules/haircut/repositories/haircut.repository';
import { UserFindManyDto } from '@/modules/user/domain/dto/user-find-many.dto';
import { IOption } from '@/shared/domain/interfaces/option.interface';
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
  companyId: number;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
  optionsParams?: UserFindManyDto;
}

export function ControlledHaircut({
  companyId,
  optionsParams,
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const haircutRepository = new HaircutRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [haircuts, setHaircuts] = useState<IOption[]>([]);

  async function getHaircuts(search?: string) {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await haircutRepository.findMany({
        ...optionsParams,
        search,
        companyId,
        page: 1,
        pageSize: 25,
      });

      setHaircuts(
        data.map((haircut) => ({
          label: `${haircut.name} - ${haircut.price} R$ - ${haircut.duration} min`,
          value: haircut.id,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!companyId) return;
    getHaircuts();
  }, [optionsParams, companyId]);

  return (
    <ControlledAutocomplete
      {...props}
      options={haircuts}
      loading={loading}
      label={label}
      variant={variant}
      color={color}
      translate={null}
    />
  );
}
