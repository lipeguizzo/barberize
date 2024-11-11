import { WorkingDayFindManyDto } from '@/modules/working-day/domain/dto/working-day-find-many.dto';
import {
  EDayOfWeek,
  EDayOfWeekTranslate,
} from '@/modules/working-day/domain/enums/day-of-week.enum';
import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<WorkingDayFindManyDto>) => void;
}

export function WorkingDayFilter({ onFilter }: Props) {
  const { control, watch } = useForm<WorkingDayFindManyDto>({
    defaultValues: {
      isOpen: false,
    },
  });
  const day: EDayOfWeek | undefined = watch('day');
  const isOpen: boolean | undefined = watch('isOpen');

  useEffect(() => {
    onFilter({
      day,
      isOpen,
    });
  }, [onFilter, day, isOpen]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          options={EDayOfWeek}
          translate={EDayOfWeekTranslate}
          control={control}
          label="Dia"
          name="day"
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCheckbox
          label="Abertos"
          name="isOpen"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
