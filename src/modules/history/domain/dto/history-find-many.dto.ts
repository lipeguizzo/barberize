import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';

export interface HistoryFindManyDto extends IPaginationRequest {
  search?: string;
  clientId?: number;
  clientName?: string;
  barberId?: number;
  barberName?: string;
}
