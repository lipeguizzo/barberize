import { EDayOfWeek } from '../enums/day-of-week.enum';

export interface WorkingDayCreateDto {
  day: EDayOfWeek;
  isOpen: boolean;
  companyId?: number;
}
