import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { AuthRecoverPasswordResponseDto } from '../dto/auth-recover-password-response.dto';
import { AuthLoginData } from '../schemas/auth-login.schema';
import { AuthRecoverData } from '../schemas/auth-recover.schema';
import { AuthResetData } from '../schemas/auth-reset.schema';
import { IAuth } from './auth.interface';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';

export interface IAuthContextType extends IAuth {
  login: (data: AuthLoginData) => Promise<void>;
  recover: (data: AuthRecoverData) => Promise<AuthRecoverPasswordResponseDto>;
  reset: (data: AuthResetData) => Promise<UserEntity>;
  logout: () => Promise<void>;
  loading: boolean;
  abilities: AbilityEntity[] | null;
}
