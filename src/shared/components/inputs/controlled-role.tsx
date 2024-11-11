/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { RoleFindManyDto } from '@/modules/role/domain/dto/role-find-many.dto';
import { RoleRepository } from '@/modules/role/repositories/role.repository';
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
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
  optionsParams?: RoleFindManyDto;
}

export function ControlledRole({
  optionsParams,
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const roleRepository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [roles, setRoles] = useState<IOption[]>([]);

  async function getRoles(search?: string) {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await roleRepository.findMany({
        ...optionsParams,
        search,
        page: 1,
        pageSize: 25,
      });

      setRoles(
        data.map((role) => ({
          label: role.name,
          value: role.id,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRoles();
  }, [optionsParams]);

  return (
    <ControlledAutocomplete
      {...props}
      options={roles}
      loading={loading}
      label={label}
      variant={variant}
      color={color}
      translate={null}
    />
  );
}
