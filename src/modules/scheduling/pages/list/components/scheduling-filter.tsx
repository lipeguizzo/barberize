import { SchedulingFindManyDto } from '@/modules/scheduling/domain/dto/scheduling-find-many.dto';
import {
  EScheduleStatus,
  EScheduleStatusTranslate,
} from '@/modules/scheduling/domain/enums/schedule-status.enum';
import { ControlledEnum } from '@/shared/components/inputs/controlled-enum';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<SchedulingFindManyDto>) => void;
}

export function SchedulingFilter({ onFilter }: Props) {
  const { control, watch } = useForm<SchedulingFindManyDto>({
    defaultValues: {
      search: '',
      barberName: '',
      clientName: '',
    },
  });

  const search: string | undefined = watch('search');
  const barberName: string | undefined = watch('barberName');
  const clientName: string | undefined = watch('clientName');
  const status: EScheduleStatus[] | undefined = watch('status');

  useEffect(() => {
    onFilter({
      search,
      barberName,
      clientName,
      status,
    });
  }, [search, onFilter, barberName, clientName, status]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome do barbeiro"
          name="barberName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome do cliente"
          name="clientName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          control={control}
          options={EScheduleStatus}
          translate={EScheduleStatusTranslate}
          multiple={true}
          excludeOptions={[EScheduleStatus.COMPLETED, EScheduleStatus.CANCELED]}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
    </Grid>
  );
}
