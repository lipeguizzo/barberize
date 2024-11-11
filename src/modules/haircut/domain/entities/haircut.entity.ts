import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';

export class HaircutEntity {
  id: number = 0;
  name: string = '';
  price: number = 0;
  duration: number = 0;
  companyId: number = 0;
  company?: CompanyEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: Partial<HaircutEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    Object.assign(this, {
      company,
      ...partial,
    });
  }
}
