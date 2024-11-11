import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { HaircutCreateDto } from '../domain/dto/haircut-create.dto';
import { HaircutFindManyDto } from '../domain/dto/haircut-find-many.dto';
import { HaircutUpdateDto } from '../domain/dto/haircut-update.dto';
import { HaircutEntity } from '../domain/entities/haircut.entity';

export class HaircutRepository extends Repository {
  constructor() {
    super('/haircuts');
  }

  public async findMany(
    params: HaircutFindManyDto,
  ): Promise<IPaginationResponse<HaircutEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<HaircutEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (haircut: Partial<HaircutEntity>) => new HaircutEntity(haircut),
            )
          : ([] as HaircutEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<HaircutEntity> {
    const { status, data } = await this.http.get<HaircutEntity>(`/${id}`);

    if (this.isOK(status)) return new HaircutEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: HaircutCreateDto): Promise<HaircutEntity> {
    const { status, data } = await this.http.post<
      HaircutEntity,
      HaircutCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new HaircutEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: HaircutUpdateDto): Promise<HaircutEntity> {
    const { status, data } = await this.http.put<
      HaircutEntity,
      HaircutUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new HaircutEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<HaircutEntity> {
    const { status, data } = await this.http.delete<HaircutEntity>(`/${id}`);

    if (this.isOK(status)) return new HaircutEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
