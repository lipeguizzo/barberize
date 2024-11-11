import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';

export class HolidayEntity {
  id: number = 0;
  name: string = '';
  dayMonth: string = '';
  companyId: number = 0;
  company?: CompanyEntity;
  createdAt: Date = new Date();

  constructor(partial: Partial<HolidayEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    Object.assign(this, {
      company,
      ...partial,
    });
  }
}
