import { useAuth } from '@/modules/auth/hooks/use-auth';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Page } from '@/shared/layout/components/page/page';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { AssessmentFindManyDto } from '../../domain/dto/assessment-find-many.dto';
import { AssessmentRepository } from '../../repositories/assessment.repository';
import { AssessmentFilter } from './components/assessment-filter';
import { AssessmentTable } from './components/assessment-table';

export function AssessmentList() {
  const assessmentRepository = new AssessmentRepository();

  const { user } = useAuth();

  const isCompany: boolean =
    user?.role?.reference === ERoleReference.ADMIN_COMPANY;
  const isBarber: boolean =
    user?.role?.reference === ERoleReference.PROFESSIONAL;
  const isClient: boolean = user?.role?.reference === ERoleReference.CLIENT;

  const [params, setParams] = useState<AssessmentFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    companyId: isCompany ? user?.companyId : undefined,
    barberId: isBarber ? user?.id : undefined,
    clientId: isClient ? user?.id : undefined,
  });

  const { data, isLoading, mutate } = useSWR(
    ['assessments', params],
    ([, value]) => assessmentRepository.findMany(value),
  );

  function handleFilter(filter: Partial<AssessmentFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Avaliações" />
      </PageHeader>
      <PageContent>
        <AssessmentFilter onFilter={handleFilter} />
        <AssessmentTable
          data={data}
          pagination={params}
          onChangePagination={handlePagination}
          loading={isLoading}
          reload={mutate}
        />
      </PageContent>
    </Page>
  );
}
