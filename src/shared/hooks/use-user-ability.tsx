import { useContext } from 'react';
import { UserAbilityContext } from '../contexts/user-ability';

export function useUserAbility() {
  return useContext(UserAbilityContext);
}
