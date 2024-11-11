import { EScheduleStatus } from './../enums/schedule-status.enum';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface SchedulingFindManyDto extends IPaginationRequest {
  search?: string;
  date?: string;
  clientId?: number;
  clientName?: string;
  barberId?: number;
  barberName?: string;
  companyId?: number;
  status?: EScheduleStatus[];
}
