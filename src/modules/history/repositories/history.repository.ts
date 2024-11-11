import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { HistoryFindManyDto } from '../domain/dto/history-find-many.dto';
import { HistoryEntity } from '../domain/entities/history.entity';
import { HistoryCreateDto } from '../domain/dto/history-create.dto';
import { HistoryUpdateDto } from '../domain/dto/history-update.dto';

export class HistoryRepository extends Repository {
  constructor() {
    super('/histories');
  }

  public async findMany(
    params: HistoryFindManyDto,
  ): Promise<IPaginationResponse<HistoryEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<HistoryEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (history: Partial<HistoryEntity>) => new HistoryEntity(history),
            )
          : ([] as HistoryEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<HistoryEntity> {
    const { status, data } = await this.http.get<HistoryEntity>(`/${id}`);

    if (this.isOK(status)) return new HistoryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: HistoryCreateDto): Promise<HistoryEntity> {
    const { status, data } = await this.http.post<
      HistoryEntity,
      HistoryCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new HistoryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: HistoryUpdateDto): Promise<HistoryEntity> {
    const { status, data } = await this.http.put<
      HistoryEntity,
      HistoryUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new HistoryEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete<void>(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Aconteceu um erro!');
  }
}
