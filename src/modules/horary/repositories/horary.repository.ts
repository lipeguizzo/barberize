import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { HoraryCreateDto } from '../domain/dto/horary-create.dto';
import { HoraryFindManyDto } from '../domain/dto/horary-find-many.dto';
import { HoraryUpdateAvailableDto } from '../domain/dto/horary-update-available.dto';
import { HoraryUpdateDto } from '../domain/dto/horary-update.dto';
import { HoraryEntity } from '../domain/entities/horary.entity';

export class HoraryRepository extends Repository {
  constructor() {
    super('/hours');
  }

  public async findMany(
    params: HoraryFindManyDto,
  ): Promise<IPaginationResponse<HoraryEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<HoraryEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (horary: Partial<HoraryEntity>) => new HoraryEntity(horary),
            )
          : ([] as HoraryEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<HoraryEntity> {
    const { status, data } = await this.http.get<HoraryEntity>(`/${id}`);

    if (this.isOK(status)) return new HoraryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: HoraryCreateDto): Promise<HoraryEntity> {
    const { status, data } = await this.http.post<
      HoraryEntity,
      HoraryCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new HoraryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: HoraryUpdateDto): Promise<HoraryEntity> {
    const { status, data } = await this.http.put<HoraryEntity, HoraryUpdateDto>(
      `/${id}`,
      dto,
    );

    if (this.isOK(status)) return new HoraryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateAvailable(
    id: ID,
    dto: HoraryUpdateAvailableDto,
  ): Promise<HoraryEntity> {
    const { status, data } = await this.http.put<
      HoraryEntity,
      HoraryUpdateAvailableDto
    >(`/${id}/available`, dto);

    if (this.isOK(status)) return new HoraryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<HoraryEntity> {
    const { status, data } = await this.http.delete<HoraryEntity>(`/${id}`);

    if (this.isOK(status)) return new HoraryEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
