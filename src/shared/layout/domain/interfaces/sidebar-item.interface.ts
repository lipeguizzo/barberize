import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ReactNode } from 'react';

export interface ISidebarItem {
  icon: ReactNode;
  name: string;
  path: string;
  ability?: EAbilityCode;
}
