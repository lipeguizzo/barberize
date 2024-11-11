import { CompanyFindManyDto } from '@/modules/company/domain/dto/company-find-many.dto';
import { ControlledCity } from '@/shared/components/inputs/controlled-city';
import { ControlledSearch } from '@/shared/components/inputs/controlled-search';
import { ControlledState } from '@/shared/components/inputs/controlled-state';
import { ControlledText } from '@/shared/components/inputs/controlled-text';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<CompanyFindManyDto>) => void;
}

export function HomeCompaniesFilter({ onFilter }: Props) {
  const { control, watch } = useForm<CompanyFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      tradeName: '',
      email: '',
      state: '',
      city: '',
      street: '',
      neighborhood: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const tradeName: string | undefined = watch('tradeName');
  const email: string | undefined = watch('email');
  const state: string | undefined = watch('state');
  const city: string | undefined = watch('city');
  const street: string | undefined = watch('street');
  const neighborhood: string | undefined = watch('neighborhood');

  useEffect(() => {
    onFilter({
      search,
      name,
      tradeName,
      email,
      state,
      city,
      street,
      neighborhood,
    });
  }, [
    search,
    onFilter,
    name,
    tradeName,
    email,
    state,
    city,
    street,
    neighborhood,
  ]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome fantasia"
          name="tradeName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="E-mail" name="email" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledState
          label="Estado"
          name="state"
          size="medium"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledCity
          state={String(state)}
          label="Cidade"
          name="city"
          size="medium"
          control={control}
          variant="outlined"
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Bairro"
          name="neighborhood"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Bairro"
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Logradouro"
          name="street"
          size="medium"
          control={control}
          variant="outlined"
          placeholder="Logradouro"
        />
      </Grid>
    </Grid>
  );
}
