import { Repository } from '@/infra/http/repository';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { AuthLoginResponseDto } from '../domain/dto/auth-login-response.dto';
import { AuthRecoverPasswordResponseDto } from '../domain/dto/auth-recover-password-response.dto';
import { AuthRefreshResponseDto } from '../domain/dto/auth-refresh-response.dto';
import { AuthRegisterDto } from '../domain/dto/auth-register.dto';
import { AuthLoginData } from '../domain/schemas/auth-login.schema';
import { AuthRecoverData } from '../domain/schemas/auth-recover.schema';
import { AuthResetData } from '../domain/schemas/auth-reset.schema';

export class AuthRepository extends Repository {
  constructor() {
    super('/auth');
  }

  public async login(dto: AuthLoginData): Promise<AuthLoginResponseDto> {
    const { status, data } = await this.http.post<
      AuthLoginResponseDto,
      AuthLoginData
    >('/login', dto);

    if (this.isOK(status))
      return {
        token: data.token,
        user: new UserEntity(data.user),
        refreshToken: data.refreshToken,
      };

    throw new Error('Aconteceu um erro!');
  }

  public async refreshToken(
    refreshToken: string,
  ): Promise<AuthRefreshResponseDto> {
    const { status, data } = await this.http.post<
      AuthRefreshResponseDto,
      { refreshToken: string }
    >('/refresh', {
      refreshToken: refreshToken,
    });

    if (this.isOK(status))
      return {
        user: new UserEntity(data.user),
        token: data.token,
        refreshToken: data.refreshToken,
      };

    throw new Error('Aconteceu um erro!');
  }

  public async recover(
    dto: AuthRecoverData,
  ): Promise<AuthRecoverPasswordResponseDto> {
    const { status, data } = await this.http.post<
      AuthRecoverPasswordResponseDto,
      AuthRecoverData
    >(`/recover-password`, dto);

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async reset(dto: AuthResetData): Promise<UserEntity> {
    const { status, data } = await this.http.patch<UserEntity, AuthResetData>(
      `/reset-password`,
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async register(dto: AuthRegisterDto): Promise<UserEntity> {
    const { status, data } = await this.http.post<UserEntity, AuthRegisterDto>(
      `/register`,
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }
}
