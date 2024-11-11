import { EScheduleStatus } from '../enums/schedule-status.enum';

export interface SchedulingUpdateDto {
  date: Date;
  companyId: number;
  horaryId: number;
  haircutId: number;
  clientId: number;
  barberId: number;
  status: EScheduleStatus;
}
