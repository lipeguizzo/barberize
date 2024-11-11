import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';
import { UserUpdateStatusDto } from '../domain/dto/user-update-status.dto';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { UserUpdateSelfDto } from '../domain/dto/user-update-self.dto';

export class UserRepository extends Repository {
  constructor() {
    super('/users');
  }

  public async findMany(
    params: UserFindManyDto,
  ): Promise<IPaginationResponse<UserEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<UserEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (user: Partial<UserEntity>) => new UserEntity(user),
            )
          : ([] as UserEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<UserEntity> {
    const { status, data } = await this.http.get<UserEntity>(`/${id}`);

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async findSelf(): Promise<UserEntity> {
    const { status, data } = await this.http.get<UserEntity>(`/self`);

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: UserCreateDto): Promise<UserEntity> {
    const { status, data } = await this.http.post<UserEntity, UserCreateDto>(
      `/`,
      dto,
    );

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: UserUpdateDto): Promise<UserEntity> {
    const { status, data } = await this.http.put<UserEntity, UserUpdateDto>(
      `/${id}`,
      dto,
    );

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateSelf(dto: UserUpdateSelfDto): Promise<UserEntity> {
    const { status, data } = await this.http.put<UserEntity, UserUpdateSelfDto>(
      `/self`,
      dto,
    );

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateStatus(
    id: ID,
    dto: UserUpdateStatusDto,
  ): Promise<UserEntity> {
    const { status, data } = await this.http.patch<
      UserEntity,
      UserUpdateStatusDto
    >(`/${id}/status`, dto);

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateAvatar(dto: FormData): Promise<UserEntity> {
    const { status, data } = await this.http.patch<UserEntity, FormData>(
      `/avatar`,
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async deleteAvatar(): Promise<UserEntity> {
    const { status, data } = await this.http.delete<UserEntity>(`/avatar`);

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<UserEntity> {
    const { status, data } = await this.http.delete<UserEntity>(`/${id}`);

    if (this.isOK(status)) return new UserEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
