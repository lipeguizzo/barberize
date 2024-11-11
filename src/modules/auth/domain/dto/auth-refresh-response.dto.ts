import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface AuthRefreshResponseDto {
  user: UserEntity;
  token: string;
  refreshToken: string;
}
