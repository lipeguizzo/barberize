import { useAuth } from '@/modules/auth/hooks/use-auth';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { CircularProgress, Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  code: EAbilityCode;
  action?: EAbilityAction;
}

export function RequiredAbility({ code: reference, action }: Props) {
  const { abilities, loading } = useAuth();

  const requiredByAbility = action
    ? (ability: AbilityEntity) =>
        ability.code === reference && ability.action === action
    : (ability: AbilityEntity) => ability.code === reference;

  if (loading)
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress size="50px" />
      </Stack>
    );

  if (!abilities) return <Navigate to="/" />;

  return abilities.some(requiredByAbility) ? <Outlet /> : <Navigate to="/" />;
}
