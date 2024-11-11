import { ControlledNumber } from '@/shared/components/inputs/controlled-number';
import { ControlledPrice } from '@/shared/components/inputs/controlled-price';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function HaircutForm() {
  const { control } = useFormContext();

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome"
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledPrice
          label="Preço R$"
          name="price"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Preço R$"
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledNumber
          label="Duração (Minutos)"
          name="duration"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Duração (Minutos)"
        />
      </Grid>
    </Grid>
  );
}
