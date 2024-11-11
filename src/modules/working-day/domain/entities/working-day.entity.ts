import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { EDayOfWeek } from '../enums/day-of-week.enum';

export class WorkingDayEntity {
  id: number = 0;
  day: EDayOfWeek = EDayOfWeek.MONDAY;
  isOpen: boolean = true;
  companyId: number = 0;
  company?: CompanyEntity;
  createdAt: Date = new Date();

  constructor(partial: Partial<WorkingDayEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    Object.assign(this, {
      company,
      ...partial,
    });
  }
}
