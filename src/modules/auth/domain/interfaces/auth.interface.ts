import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IAuth {
  authenticated: boolean;
  user: UserEntity | null;
}
