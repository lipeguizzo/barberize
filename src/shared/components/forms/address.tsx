import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import { ControlledState } from '../inputs/controlled-state';
import { ControlledCity } from '../inputs/controlled-city';

export function AddressForm() {
  const { control, watch } = useFormContext();
  const state: string = watch('address.state');

  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledState
          label="Estado"
          name="address.state"
          size="medium"
          control={control}
          variant="outlined"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledCity
          state={state}
          label="Cidade"
          name="address.city"
          size="medium"
          control={control}
          variant="outlined"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Bairro"
          name="address.neighborhood"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Bairro"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Logradouro"
          name="address.street"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Logradouro"
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledText
          label="Complemento"
          name="address.complement"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Complemento"
        />
      </Grid>
    </Grid>
  );
}
