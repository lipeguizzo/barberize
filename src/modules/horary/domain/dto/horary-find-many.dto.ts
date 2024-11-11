import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface HoraryFindManyDto extends IPaginationRequest {
  search?: string;
  time?: string;
  isAvailable?: boolean;
  companyId?: number;
}
