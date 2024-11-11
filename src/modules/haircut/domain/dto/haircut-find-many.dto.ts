import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface HaircutFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  includeDeleted?: boolean;
  companyId?: number;
}
