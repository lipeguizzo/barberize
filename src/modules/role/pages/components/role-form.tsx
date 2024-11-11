import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '../../domain/enums/role-reference.enum';

export function RoleForm() {
  const { excludeReferences } = useUserAbility();
  const { control } = useFormContext();
  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome"
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          excludeOptions={excludeReferences()}
          control={control}
          label="Referência"
          name="reference"
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
          label="Status"
          name="status"
        />
      </Grid>
    </Grid>
  );
}
