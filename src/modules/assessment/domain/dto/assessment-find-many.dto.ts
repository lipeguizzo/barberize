import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface AssessmentFindManyDto extends IPaginationRequest {
  search?: string;
  clientId?: number;
  clientName?: string;
  barberId?: number;
  barberName?: string;
  companyId?: number;
}
