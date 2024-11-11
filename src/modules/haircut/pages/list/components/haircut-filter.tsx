import { HaircutFindManyDto } from '@/modules/haircut/domain/dto/haircut-find-many.dto';
import { ControlledCheckbox } from '@/shared/components/inputs/controlled-checkbox';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<HaircutFindManyDto>) => void;
}

export function HaircutFilter({ onFilter }: Props) {
  const { control, watch } = useForm<HaircutFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      name,
      includeDeleted,
    });
  }, [search, includeDeleted, onFilter, name]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCheckbox
          label="Incluir deletados"
          name="includeDeleted"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
