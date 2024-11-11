import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';

export interface UserFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  email?: string;
  roleId?: number;
  roleReference?: ERoleReference;
  companyId?: number;
  status?: EStatus;
  includeDeleted?: boolean;
}
