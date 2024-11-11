import { HistoryFindManyDto } from '@/modules/history/domain/dto/history-find-many.dto';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<HistoryFindManyDto>) => void;
}

export function HistoryFilter({ onFilter }: Props) {
  const { control, watch } = useForm<HistoryFindManyDto>({
    defaultValues: {
      search: '',
      barberName: '',
      clientName: '',
    },
  });

  const search: string | undefined = watch('search');
  const barberName: string | undefined = watch('barberName');
  const clientName: string | undefined = watch('clientName');

  useEffect(() => {
    onFilter({
      search,
      barberName,
      clientName,
    });
  }, [search, onFilter, barberName, clientName]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText
          label="Nome do barbeiro"
          name="barberName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText
          label="Nome do cliente"
          name="clientName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
    </Grid>
  );
}
