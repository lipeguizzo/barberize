import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';

export class HoraryEntity {
  id: number = 0;
  time: string = '';
  isAvailable: boolean = true;
  companyId: number = 0;
  company?: CompanyEntity;
  createdAt: Date = new Date();

  constructor(partial: Partial<HoraryEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    Object.assign(this, {
      company,
      ...partial,
    });
  }
}
