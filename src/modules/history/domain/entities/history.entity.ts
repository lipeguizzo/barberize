import { SchedulingEntity } from '@/modules/scheduling/domain/entities/scheduling.entity';

export class HistoryEntity {
  id: number = 0;
  action: string = '';
  schedulingId: number = 0;
  scheduling?: SchedulingEntity;
  createdAt: Date = new Date();

  constructor(partial: Partial<HistoryEntity>) {
    const scheduling =
      partial.scheduling && new SchedulingEntity(partial.scheduling);
    Object.assign(this, {
      scheduling,
      ...partial,
    });
  }
}
