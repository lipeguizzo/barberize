import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { HolidayCreateDto } from '../domain/dto/holiday-create.dto';
import { HolidayFindManyDto } from '../domain/dto/holiday-find-many.dto';
import { HolidayUpdateDto } from '../domain/dto/holiday-update.dto';
import { HolidayEntity } from '../domain/entities/holiday.entity';

export class HolidayRepository extends Repository {
  constructor() {
    super('/holidays');
  }

  public async findMany(
    params: HolidayFindManyDto,
  ): Promise<IPaginationResponse<HolidayEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<HolidayEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (holiday: Partial<HolidayEntity>) => new HolidayEntity(holiday),
            )
          : ([] as HolidayEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<HolidayEntity> {
    const { status, data } = await this.http.get<HolidayEntity>(`/${id}`);

    if (this.isOK(status)) return new HolidayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: HolidayCreateDto): Promise<HolidayEntity> {
    const { status, data } = await this.http.post<
      HolidayEntity,
      HolidayCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new HolidayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: HolidayUpdateDto): Promise<HolidayEntity> {
    const { status, data } = await this.http.put<
      HolidayEntity,
      HolidayUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new HolidayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<HolidayEntity> {
    const { status, data } = await this.http.delete<HolidayEntity>(`/${id}`);

    if (this.isOK(status)) return new HolidayEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
