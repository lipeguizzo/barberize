import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export class AssessmentEntity {
  id: number = 0;
  score: number = 0;
  commentary?: string;
  companyId: number = 0;
  company?: CompanyEntity;
  clientId: number = 0;
  client?: UserEntity;
  barberId: number = 0;
  barber?: UserEntity;
  createdAt: Date = new Date();

  constructor(partial: Partial<AssessmentEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    const client = partial.client && new UserEntity(partial.client);
    const barber = partial.barber && new UserEntity(partial.barber);
    Object.assign(this, {
      company,
      client,
      barber,
      ...partial,
    });
  }
}
