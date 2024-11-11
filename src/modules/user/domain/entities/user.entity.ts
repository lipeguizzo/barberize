import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '../enums/gender.enum';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { StoredFileEntity } from '@/shared/domain/entities/stored-file.entity';

export class UserEntity {
  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  gender: EGender = EGender.M;
  phone: string = '';
  status: EStatus = EStatus.ACTIVE;
  companyId?: number = 0;
  company?: CompanyEntity;
  roleId: number = 0;
  role?: RoleEntity;
  avatarId?: number = 0;
  avatar?: StoredFileEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: Partial<UserEntity>) {
    const company = partial.company && new CompanyEntity(partial.company);
    const role = partial.role && new RoleEntity(partial.role);
    const avatar = partial.avatar && new StoredFileEntity(partial.avatar);
    Object.assign(this, {
      company,
      role,
      avatar,
      ...partial,
    });
  }
}
