import { useAuth } from '@/modules/auth/hooks/use-auth';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ISidebarItem } from '../../domain/interfaces/sidebar-item.interface';
import { IconButton, ListItemButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  item: ISidebarItem;
}

export function AuthenticatedSidebarItem({ item }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { abilities } = useAuth();

  const userAbilities = abilities ?? [];

  const selected = pathname === item.path;

  function verifyAbility(code?: EAbilityCode): boolean {
    return code
      ? userAbilities.some((ability: AbilityEntity) => ability.code === code)
      : true;
  }

  function handleNavigate(path: string) {
    navigate(path);
  }

  if (!verifyAbility(item.ability)) return <></>;

  return (
    <ListItemButton
      onClick={() => handleNavigate(item.path ?? '')}
      selected={selected}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        borderRadius: '20px',
      }}
    >
      {(item.icon && (
        <IconButton color={selected ? 'secondary' : 'primary'}>
          {item.icon}
        </IconButton>
      )) ??
        item.name.toUpperCase()}
    </ListItemButton>
  );
}
