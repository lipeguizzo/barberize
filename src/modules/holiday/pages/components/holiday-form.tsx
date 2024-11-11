import { ControlledDayMonth } from '@/shared/components/inputs/controlled-day-month';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';

export function HolidayForm() {
  const { control } = useFormContext();

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Nome"
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledDayMonth
          label="Dia e Mês"
          name="dayMonth"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Dia e Mês"
        />
      </Grid>
    </Grid>
  );
}
