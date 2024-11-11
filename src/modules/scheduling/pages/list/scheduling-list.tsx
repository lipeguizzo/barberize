import { useAuth } from '@/modules/auth/hooks/use-auth';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Page } from '@/shared/layout/components/page/page';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { SchedulingFindManyDto } from '../../domain/dto/scheduling-find-many.dto';
import { SchedulingRepository } from '../../repositories/scheduling.repository';
import { SchedulingFilter } from './components/scheduling-filter';
import { SchedulingTable } from './components/scheduling-table';

export function SchedulingList() {
  const schedulingRepository = new SchedulingRepository();

  const { user } = useAuth();

  const isCompany: boolean =
    user?.role?.reference === ERoleReference.ADMIN_COMPANY;
  const isBarber: boolean =
    user?.role?.reference === ERoleReference.PROFESSIONAL;
  const isClient: boolean = user?.role?.reference === ERoleReference.CLIENT;

  const [params, setParams] = useState<SchedulingFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    companyId: isCompany ? user?.companyId : undefined,
    barberId: isBarber ? user?.id : undefined,
    clientId: isClient ? user?.id : undefined,
  });

  const { data, isLoading, mutate } = useSWR(
    ['schedulings', params],
    ([, value]) => schedulingRepository.findMany(value),
  );

  function handleFilter(filter: Partial<SchedulingFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Agendamentos" />
      </PageHeader>
      <PageContent>
        <SchedulingFilter onFilter={handleFilter} />
        <SchedulingTable
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
