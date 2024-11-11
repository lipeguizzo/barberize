import { AddressForm } from '@/shared/components/forms/address';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function CompanyForm() {
  const { control } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome da empresa"
          name="companyName"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome da empresa"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome fantasia da empresa"
          name="companyTradeName"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome da empresa"
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledText
          label="E-mail da empresa"
          name="companyEmail"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="E-mail da empresa"
        />
      </Grid>

      <AddressForm />
    </Grid>
  );
}
