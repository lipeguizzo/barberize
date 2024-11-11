/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { IUserAbilityContextType } from '../domain/interfaces/user-ability-context-type.interface';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { groupAbilitiesByCode } from '@/modules/role/helpers/group-abilities-by-code';

export const UserAbilityContext = createContext<IUserAbilityContextType>(
  {} as IUserAbilityContextType,
);

export const UserAbilityProvider = ({ children }: PropsWithChildren) => {
  const { user, abilities } = useAuth();

  function excludeReferences(): string[] {
    const isAdmin: boolean = user?.role?.reference === ERoleReference.ADMIN;

    const isAdminCompany: boolean =
      user?.role?.reference === ERoleReference.ADMIN_COMPANY;

    const isProfessional: boolean =
      user?.role?.reference === ERoleReference.PROFESSIONAL;

    const isClient: boolean = user?.role?.reference === ERoleReference.CLIENT;

    if (isAdmin) return [];

    if (isAdminCompany) return [ERoleReference.ADMIN];

    if (isProfessional)
      return [ERoleReference.ADMIN, ERoleReference.ADMIN_COMPANY];

    if (isClient)
      return [
        ERoleReference.ADMIN,
        ERoleReference.ADMIN_COMPANY,
        ERoleReference.PROFESSIONAL,
      ];

    return [];
  }

  function groupedAbilities(): Record<string, AbilityEntity[]> {
    if (!abilities) return {};
    return groupAbilitiesByCode(abilities);
  }

  function canAction(code: EAbilityCode, action: EAbilityAction): boolean {
    return (
      abilities?.some(
        (ability) => ability.code === code && ability.action === action,
      ) ?? false
    );
  }

  function canRead(code: EAbilityCode) {
    return canAction(code, EAbilityAction.READ);
  }

  function canCreate(code: EAbilityCode) {
    return canAction(code, EAbilityAction.CREATE);
  }

  function canUpdate(code: EAbilityCode) {
    return canAction(code, EAbilityAction.UPDATE);
  }

  function canDelete(code: EAbilityCode) {
    return canAction(code, EAbilityAction.DELETE);
  }

  const value = useMemo(
    () => ({
      abilities,
      excludeReferences,
      groupedAbilities,
      canRead,
      canCreate,
      canUpdate,
      canDelete,
    }),
    [abilities, canCreate, canDelete, canRead, canUpdate],
  );

  return (
    <UserAbilityContext.Provider value={value}>
      {children}
    </UserAbilityContext.Provider>
  );
};
