import { AssessmentFindManyDto } from '@/modules/assessment/domain/dto/assessment-find-many.dto';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<AssessmentFindManyDto>) => void;
}

export function AssessmentFilter({ onFilter }: Props) {
  const { control, watch } = useForm<AssessmentFindManyDto>({
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
