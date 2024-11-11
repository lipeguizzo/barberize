import { AddressForm } from '@/shared/components/forms/address';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import { ControlledUpload } from '@/shared/components/inputs/controlled-upload';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function CompanyForm() {
  const { control } = useFormContext();
  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledUpload name="avatar" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome"
        />
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome fantasia"
          name="tradeName"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome fantasia"
        />
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="E-mail"
        />
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledEnum
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
          label="Status"
          name="status"
        />
      </Grid>

      <AddressForm />
    </Grid>
  );
}
