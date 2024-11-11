import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { SchedulingCreateDto } from '../domain/dto/scheduling-create.dto';
import { SchedulingFindManyDto } from '../domain/dto/scheduling-find-many.dto';
import { SchedulingUpdateStatusDto } from '../domain/dto/scheduling-update-status.dto';
import { SchedulingUpdateDto } from '../domain/dto/scheduling-update.dto';
import { SchedulingEntity } from '../domain/entities/scheduling.entity';
import { SchedulingFindHoursDto } from '../domain/dto/scheduling-find-hours.dto';
import { HoraryEntity } from '@/modules/horary/domain/entities/horary.entity';
import { SchedulingFindUnavailableDaysDto } from '../domain/dto/scheduling-find-unavailable-days.dto';
import { SchedulingFindUnavailableDaysResponseDto } from '../domain/dto/scheduling-find-unavailable-days-response.dto';

export class SchedulingRepository extends Repository {
  constructor() {
    super('/schedulings');
  }

  public async findMany(
    params: SchedulingFindManyDto,
  ): Promise<IPaginationResponse<SchedulingEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<SchedulingEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (scheduling: Partial<SchedulingEntity>) =>
                new SchedulingEntity(scheduling),
            )
          : ([] as SchedulingEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findHours(
    params: SchedulingFindHoursDto,
  ): Promise<HoraryEntity[]> {
    const { status, data } = await this.http.get<HoraryEntity[]>('/hours', {
      params,
    });

    if (this.isOK(status)) {
      return Array.isArray(data)
        ? data.map((horary: Partial<HoraryEntity>) => new HoraryEntity(horary))
        : ([] as HoraryEntity[]);
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findUnavailableDays(
    params: SchedulingFindUnavailableDaysDto,
  ): Promise<SchedulingFindUnavailableDaysResponseDto[]> {
    const { status, data } = await this.http.get<
      SchedulingFindUnavailableDaysResponseDto[]
    >('/unavailable-days', {
      params,
    });

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<SchedulingEntity> {
    const { status, data } = await this.http.get<SchedulingEntity>(`/${id}`);

    if (this.isOK(status)) return new SchedulingEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: SchedulingCreateDto): Promise<SchedulingEntity> {
    const { status, data } = await this.http.post<
      SchedulingEntity,
      SchedulingCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new SchedulingEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(
    id: ID,
    dto: SchedulingUpdateDto,
  ): Promise<SchedulingEntity> {
    const { status, data } = await this.http.put<
      SchedulingEntity,
      SchedulingUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new SchedulingEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateStatus(
    id: ID,
    dto: SchedulingUpdateStatusDto,
  ): Promise<SchedulingEntity> {
    const { status, data } = await this.http.patch<
      SchedulingEntity,
      SchedulingUpdateStatusDto
    >(`/${id}/status`, dto);

    if (this.isOK(status)) return new SchedulingEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete<void>(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Aconteceu um erro!');
  }
}
