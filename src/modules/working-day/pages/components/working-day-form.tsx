import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import {
  EDayOfWeek,
  EDayOfWeekTranslate,
} from '../../domain/enums/day-of-week.enum';

export function WorkingDayForm() {
  const { control } = useFormContext();

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          options={EDayOfWeek}
          translate={EDayOfWeekTranslate}
          control={control}
          label="Dia"
          name="day"
          readOnly
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCheckbox
          label="Aberto"
          name="isOpen"
          size="medium"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
