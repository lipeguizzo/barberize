import { Repository } from '@/infra/http/repository';
import { ID } from '@/shared/types/id';
import { AbilityEntity } from '../domain/entities/ability.entity';
import { RoleFindManyDto } from '../domain/dto/role-find-many.dto';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { RoleEntity } from '../domain/entities/role.entity';
import { RoleCreateDto } from '../domain/dto/role-create.dto';
import { RoleUpdateDto } from '../domain/dto/role-update.dto';
import { RoleUpdateStatusDto } from '../domain/dto/role-update-status.dto';

export class RoleRepository extends Repository {
  constructor() {
    super('/roles');
  }

  public async findMany(
    params: RoleFindManyDto,
  ): Promise<IPaginationResponse<RoleEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<RoleEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (role: Partial<RoleEntity>) => new RoleEntity(role),
            )
          : ([] as RoleEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<RoleEntity> {
    const { status, data } = await this.http.get<RoleEntity>(`/${id}`);

    if (this.isOK(status)) return new RoleEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async findAllAbilities(): Promise<AbilityEntity[]> {
    const { status, data } =
      await this.http.get<AbilityEntity[]>(`/all-abilities`);

    if (this.isOK(status))
      return data.map((ability) => new AbilityEntity(ability));

    throw new Error('Aconteceu um erro!');
  }

  public async findAbilities(id: ID): Promise<AbilityEntity[]> {
    const { status, data } = await this.http.get<AbilityEntity[]>(
      `/${id}/abilities`,
    );

    if (this.isOK(status))
      return data.map((ability) => new AbilityEntity(ability));

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: RoleCreateDto): Promise<RoleEntity> {
    const { status, data } = await this.http.post<RoleEntity, RoleCreateDto>(
      `/`,
      dto,
    );

    if (this.isOK(status)) return new RoleEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: RoleUpdateDto): Promise<RoleEntity> {
    const { status, data } = await this.http.put<RoleEntity, RoleUpdateDto>(
      `/${id}`,
      dto,
    );

    if (this.isOK(status)) return new RoleEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateStatus(
    id: ID,
    dto: RoleUpdateStatusDto,
  ): Promise<RoleEntity> {
    const { status, data } = await this.http.patch<
      RoleEntity,
      RoleUpdateStatusDto
    >(`/${id}/status`, dto);

    if (this.isOK(status)) return new RoleEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<RoleEntity> {
    const { status, data } = await this.http.delete<RoleEntity>(`/${id}`);

    if (this.isOK(status)) return new RoleEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
