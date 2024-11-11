import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { HaircutEntity } from '@/modules/haircut/domain/entities/haircut.entity';
import { HoraryEntity } from '@/modules/horary/domain/entities/horary.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { EScheduleStatus } from '../enums/schedule-status.enum';

export class SchedulingEntity {
  id: number = 0;
  date: Date = new Date();
  companyId: number = 0;
  company?: CompanyEntity;
  horaryId: number = 0;
  horary?: HoraryEntity;
  haircutId: number = 0;
  haircut?: HaircutEntity;
  clientId: number = 0;
  client?: UserEntity;
  barberId: number = 0;
  barber?: UserEntity;
  status: EScheduleStatus = EScheduleStatus.ACTIVE;
  createdAt: Date = new Date();

  constructor(partial: Partial<SchedulingEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    const horary = partial.horary && new HoraryEntity(partial.horary);
    const haircut = partial.haircut && new HaircutEntity(partial.haircut);
    const client = partial.client && new UserEntity(partial.client);
    const barber = partial.barber && new UserEntity(partial.barber);
    Object.assign(this, {
      company,
      horary,
      haircut,
      client,
      barber,
      ...partial,
    });
  }
}
