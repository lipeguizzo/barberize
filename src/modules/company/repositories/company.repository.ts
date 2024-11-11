import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { CompanyFindManyDto } from '../domain/dto/company-find-many.dto';
import { CompanyEntity } from '../domain/entities/company.entity';
import { CompanyCreateDto } from '../domain/dto/company-create.dto';
import { CompanyUpdateDto } from '../domain/dto/company-update.dto';
import { CompanyUpdateStatusDto } from '../domain/dto/company-update-status.dto';

export class CompanyRepository extends Repository {
  constructor() {
    super('/companies');
  }

  public async findMany(
    params: CompanyFindManyDto,
  ): Promise<IPaginationResponse<CompanyEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<CompanyEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (company: Partial<CompanyEntity>) => new CompanyEntity(company),
            )
          : ([] as CompanyEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findName(name: string): Promise<CompanyEntity> {
    const { status, data } = await this.http.get<CompanyEntity>(
      `/name/${name}`,
    );

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<CompanyEntity> {
    const { status, data } = await this.http.get<CompanyEntity>(`/${id}`);

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: CompanyCreateDto): Promise<CompanyEntity> {
    const { status, data } = await this.http.post<
      CompanyEntity,
      CompanyCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(id: ID, dto: CompanyUpdateDto): Promise<CompanyEntity> {
    const { status, data } = await this.http.put<
      CompanyEntity,
      CompanyUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateStatus(
    id: ID,
    dto: CompanyUpdateStatusDto,
  ): Promise<CompanyEntity> {
    const { status, data } = await this.http.patch<
      CompanyEntity,
      CompanyUpdateStatusDto
    >(`/${id}/status`, dto);

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateAvatar(id: ID, dto: FormData): Promise<CompanyEntity> {
    const { status, data } = await this.http.patch<CompanyEntity, FormData>(
      `/${id}/avatar`,
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async deleteAvatar(id: ID): Promise<CompanyEntity> {
    const { status, data } = await this.http.delete<CompanyEntity>(
      `/${id}/avatar`,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<CompanyEntity> {
    const { status, data } = await this.http.delete<CompanyEntity>(`/${id}`);

    if (this.isOK(status)) return new CompanyEntity(data);

    throw new Error('Aconteceu um erro!');
  }
}
