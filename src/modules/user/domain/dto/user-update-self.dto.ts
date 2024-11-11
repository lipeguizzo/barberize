import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '../enums/gender.enum';

export interface UserUpdateSelfDto {
  name: string;
  email: string;
  password: string;
  gender: EGender;
  phone: string;
  status: EStatus;
  companyId?: number;
  roleId: number;
  avatarId?: number;
}
