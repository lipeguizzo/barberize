import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { WorkingDayFindManyDto } from '../domain/dto/working-day-find-many.dto';
import { WorkingDayEntity } from '../domain/entities/working-day.entity';
import { WorkingDayCreateDto } from '../domain/dto/working-day-create.dto';
import { WorkingDayUpdateDto } from '../domain/dto/working-day-update.dto';
import { WorkingDayUpdateOpenDto } from '../domain/dto/working-day-update-open.dto';

export class WorkingDayRepository extends Repository {
  constructor() {
    super('/working-days');
  }

  public async findMany(
    params: WorkingDayFindManyDto,
  ): Promise<IPaginationResponse<WorkingDayEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<WorkingDayEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (workingDay: Partial<WorkingDayEntity>) =>
                new WorkingDayEntity(workingDay),
            )
          : ([] as WorkingDayEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<WorkingDayEntity> {
    const { status, data } = await this.http.get<WorkingDayEntity>(`/${id}`);

    if (this.isOK(status)) return new WorkingDayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: WorkingDayCreateDto): Promise<WorkingDayEntity> {
    const { status, data } = await this.http.post<
      WorkingDayEntity,
      WorkingDayCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new WorkingDayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(
    id: ID,
    dto: WorkingDayUpdateDto,
  ): Promise<WorkingDayEntity> {
    const { status, data } = await this.http.put<
      WorkingDayEntity,
      WorkingDayUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new WorkingDayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateOpen(
    id: ID,
    dto: WorkingDayUpdateOpenDto,
  ): Promise<WorkingDayEntity> {
    const { status, data } = await this.http.patch<
      WorkingDayEntity,
      WorkingDayUpdateOpenDto
    >(`/${id}/open`, dto);

    if (this.isOK(status)) return new WorkingDayEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<WorkingDayEntity> {
    const { status, data } = await this.http.delete<WorkingDayEntity>(`/${id}`);

    if (this.isOK(status)) return new WorkingDayEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
