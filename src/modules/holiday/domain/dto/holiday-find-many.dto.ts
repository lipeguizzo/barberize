import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface HolidayFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  dayMonth?: string;
  companyId?: number;
}
