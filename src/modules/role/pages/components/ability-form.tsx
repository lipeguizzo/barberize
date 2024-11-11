import { useUserAbility } from '@/shared/hooks/use-user-ability';
import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import { AbilityEntity } from '../../domain/entities/ability.entity';
import { EAbilityCode } from '../../domain/enums/ability-code.enum';
import { AbilityCard } from './ability-card';

export function AbilityForm() {
  const { groupedAbilities } = useUserAbility();
  const { setValue, watch } = useFormContext();

  const selectedAbilities: AbilityEntity[] = watch('abilities') ?? [];
  const groups: Record<string, AbilityEntity[]> = groupedAbilities();

  function handleChangeAbility(
    checked: boolean,
    ...abilities: AbilityEntity[]
  ): void {
    if (checked) {
      setValue(
        'abilities',
        [...selectedAbilities, ...abilities].filter(
          (ability, index, allAbilities) =>
            allAbilities.findIndex((a) => a.id === ability.id) === index,
        ),
      );
    } else {
      setValue(
        'abilities',
        selectedAbilities.filter(
          (selectedAbility) =>
            !abilities.find((ability) => selectedAbility.id === ability.id),
        ),
      );
    }
  }
  return (
    <Grid container spacing={3} width="100%">
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" component="h4" align="center">
          Permissões
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
          {Object.entries(groups ?? {}).map(([code, abilities]) => {
            return (
              <AbilityCard
                key={code}
                code={code as EAbilityCode}
                onChange={handleChangeAbility}
                abilities={abilities}
              />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
