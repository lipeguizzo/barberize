import { HolidayFindManyDto } from '@/modules/holiday/domain/dto/holiday-find-many.dto';
import { ControlledDayMonth } from '@/shared/components/inputs/controlled-day-month';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<HolidayFindManyDto>) => void;
}

export function HolidayFilter({ onFilter }: Props) {
  const { control, watch } = useForm<HolidayFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      dayMonth: '',
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const dayMonth: string | undefined = watch('dayMonth');

  useEffect(() => {
    onFilter({
      search,
      name,
      dayMonth,
    });
  }, [search, name, onFilter, dayMonth]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledDayMonth
          label="Dia e Mês"
          name="dayMonth"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
    </Grid>
  );
}
