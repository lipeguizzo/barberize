import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface AuthLoginResponseDto {
  user: UserEntity;
  token: string;
  refreshToken: string;
}
