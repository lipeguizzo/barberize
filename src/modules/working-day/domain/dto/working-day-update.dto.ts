import { EDayOfWeek } from '../enums/day-of-week.enum';

export interface WorkingDayUpdateDto {
  day: EDayOfWeek;
  isOpen: boolean;
  companyId?: number;
}
