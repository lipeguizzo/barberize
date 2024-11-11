import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EStatus } from '@/shared/domain/enums/status.enum';

export interface CompanyFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  tradeName?: string;
  email?: string;
  status?: EStatus;
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
  findAll?: boolean;
  includeDeleted?: boolean;
}
