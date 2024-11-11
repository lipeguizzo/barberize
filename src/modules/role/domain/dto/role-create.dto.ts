import { EStatus } from '@/shared/domain/enums/status.enum';
import { ERoleReference } from '../enums/role-reference.enum';

export interface RoleCreateDto {
  name: string;
  reference: ERoleReference;
  abilitiesIds: number[];
  companyId: number | null;
  status: EStatus;
}
