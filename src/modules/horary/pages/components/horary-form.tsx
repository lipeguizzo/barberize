import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledTime } from '@/shared/components/inputs/controlled-time';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function HoraryForm() {
  const { control } = useFormContext();

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledTime
          label="Horário"
          name="time"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Horário"
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCheckbox
          label="Disponível"
          name="isAvailable"
          size="medium"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
