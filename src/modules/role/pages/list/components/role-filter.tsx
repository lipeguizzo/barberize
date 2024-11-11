import { RoleFindManyDto } from '@/modules/role/domain/dto/role-find-many.dto';
import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '@/modules/role/domain/enums/role-reference.enum';
import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<RoleFindManyDto>) => void;
}

export function RoleFilter({ onFilter }: Props) {
  const { excludeReferences } = useUserAbility();

  const { control, watch } = useForm<RoleFindManyDto>({
    defaultValues: {
      search: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const reference: ERoleReference | undefined = watch('reference');
  const status: EStatus | undefined = watch('status');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      reference,
      status,
      includeDeleted,
    });
  }, [search, reference, status, includeDeleted, onFilter]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledEnum
          label="Referência"
          name="reference"
          control={control}
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          excludeOptions={excludeReferences()}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
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
      <Grid size={{ md: 3, xs: 12 }}>
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
