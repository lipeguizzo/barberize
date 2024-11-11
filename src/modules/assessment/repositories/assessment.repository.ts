import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { AssessmentFindManyDto } from '../domain/dto/assessment-find-many.dto';
import { AssessmentEntity } from '../domain/entities/assessment.entity';
import { AssessmentCreateDto } from '../domain/dto/assessment-create.dto';
import { AssessmentUpdateDto } from '../domain/dto/assessment-update.dto';
import { AssessmentFindNoteResponseDto } from '../domain/dto/assessment-find-note-response.dto';

export class AssessmentRepository extends Repository {
  constructor() {
    super('/assessments');
  }

  public async findMany(
    params: AssessmentFindManyDto,
  ): Promise<IPaginationResponse<AssessmentEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<AssessmentEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (assessment: Partial<AssessmentEntity>) =>
                new AssessmentEntity(assessment),
            )
          : ([] as AssessmentEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<AssessmentEntity> {
    const { status, data } = await this.http.get<AssessmentEntity>(`/${id}`);

    if (this.isOK(status)) return new AssessmentEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async findBarberNote(
    barberId: ID,
  ): Promise<AssessmentFindNoteResponseDto> {
    const { status, data } = await this.http.get<AssessmentFindNoteResponseDto>(
      `/barber/${barberId}/note`,
    );

    if (this.isOK(status))
      return {
        note: data.note,
      };

    throw new Error('Aconteceu um erro!');
  }

  public async findCompanyNote(
    companyId: ID,
  ): Promise<AssessmentFindNoteResponseDto> {
    const { status, data } = await this.http.get<AssessmentFindNoteResponseDto>(
      `/company/${companyId}/note`,
    );

    if (this.isOK(status))
      return {
        note: data.note,
      };

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: AssessmentCreateDto): Promise<AssessmentEntity> {
    const { status, data } = await this.http.post<
      AssessmentEntity,
      AssessmentCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new AssessmentEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(
    id: ID,
    dto: AssessmentUpdateDto,
  ): Promise<AssessmentEntity> {
    const { status, data } = await this.http.put<
      AssessmentEntity,
      AssessmentUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new AssessmentEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete<void>(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Aconteceu um erro!');
  }
}
