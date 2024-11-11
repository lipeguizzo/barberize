/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteProps, Avatar, Box, Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { HaircutFindManyDto } from '@/modules/haircut/domain/dto/haircut-find-many.dto';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { IOption } from '@/shared/domain/interfaces/option.interface';
import { formatErrorForNotification } from '@/shared/utils/error';
import { toast } from 'react-toastify';
import { ControlledAutocomplete } from './controlled-autocomplete';
import { createFileFromUUID, createFileURL } from '@/shared/utils/file';
import { AssessmentRepository } from '@/modules/assessment/repositories/assessment.repository';

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
  optionsParams?: HaircutFindManyDto;
}

export function ControlledBarber({
  companyId,
  optionsParams,
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const userRepository = new UserRepository();
  const assessmentRepository = new AssessmentRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<IOption[]>([]);

  async function getUsers(search?: string) {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await userRepository.findMany({
        ...optionsParams,
        search,
        companyId,
        roleReference: ERoleReference.PROFESSIONAL,
        page: 1,
        pageSize: 25,
      });

      const users = await Promise.all(
        data.map(async (user) => {
          const file = user?.avatar
            ? await createFileFromUUID(String(user?.avatar?.uuid))
            : null;
          const avatarUrl: string = file ? createFileURL(file) : '';
          const { note } = await assessmentRepository.findBarberNote(user.id);

          return {
            label: user.name,
            value: user.id,
            content: (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'left',
                  gap: 2,
                }}
              >
                {avatarUrl ? (
                  <Avatar alt="avatar" srcSet={avatarUrl} />
                ) : (
                  <Avatar
                    alt="avatar"
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                      bgcolor: 'secondary.main',
                    }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                {user.name}
                <Rating value={note} readOnly={true} />
              </Box>
            ),
          };
        }),
      );
      setUsers(users);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!companyId) return;
    getUsers();
  }, [optionsParams, companyId]);

  return (
    <ControlledAutocomplete
      {...props}
      options={users}
      loading={loading}
      label={label}
      variant={variant}
      color={color}
      translate={null}
    />
  );
}
