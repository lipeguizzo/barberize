import { HoraryFindManyDto } from '@/modules/horary/domain/dto/horary-find-many.dto';
import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledTime } from '@/shared/components/inputs/controlled-time';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<HoraryFindManyDto>) => void;
}

export function HoraryFilter({ onFilter }: Props) {
  const { control, watch } = useForm<HoraryFindManyDto>({
    defaultValues: {
      search: '',
      time: '',
      isAvailable: false,
    },
  });

  const search: string | undefined = watch('search');
  const time: string | undefined = watch('time');
  const isAvailable: boolean | undefined = watch('isAvailable');

  useEffect(() => {
    onFilter({
      search,
      time,
      isAvailable,
    });
  }, [search, time, onFilter, isAvailable]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledTime label="Horário" name="time" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCheckbox
          label="Disponíveis"
          name="isAvailable"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
