import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EDayOfWeek } from '../enums/day-of-week.enum';

export interface WorkingDayFindManyDto extends IPaginationRequest {
  day?: EDayOfWeek;
  isOpen?: boolean;
  companyId?: number;
}
