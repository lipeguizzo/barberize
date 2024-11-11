import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { ERoleReference } from '../enums/role-reference.enum';
import { EStatus } from '@/shared/domain/enums/status.enum';

export interface RoleFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  isDefault?: boolean;
  reference?: ERoleReference;
  status?: EStatus;
  includeDeleted?: boolean;
}
