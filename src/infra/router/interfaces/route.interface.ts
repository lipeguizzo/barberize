import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ReactNode } from 'react';

export interface IRoute {
  index?: boolean;
  hidden?: boolean;
  name?: string;
  path?: string;
  icon?: ReactNode;
  ability?: EAbilityCode;
  element?: ReactNode;
  children?: Array<IRoute>;
}
