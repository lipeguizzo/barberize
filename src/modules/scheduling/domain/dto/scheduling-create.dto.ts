import { EScheduleStatus } from '../enums/schedule-status.enum';

export interface SchedulingCreateDto {
  date: Date;
  horaryId: number;
  haircutId: number;
  barberId: number;
  clientId?: number;
  companyId?: number;
  status: EScheduleStatus;
}
