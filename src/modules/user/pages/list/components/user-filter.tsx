import { UserFindManyDto } from '@/modules/user/domain/dto/user-find-many.dto';
import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<UserFindManyDto>) => void;
}

export function UserFilter({ onFilter }: Props) {
  const { control, watch } = useForm<UserFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      email: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const email: string | undefined = watch('email');
  const status: EStatus | undefined = watch('status');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      name,
      email,
      status,
      includeDeleted,
    });
  }, [search, status, includeDeleted, onFilter, name, email]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledText label="E-mail" name="email" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          control={control}
          options={EStatus}
          translate={EStatusTranslate}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledCheckbox
          label="Incluir deletados"
          name="includeDeleted"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
