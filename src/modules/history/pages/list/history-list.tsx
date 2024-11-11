import { useAuth } from '@/modules/auth/hooks/use-auth';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Page } from '@/shared/layout/components/page/page';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { HistoryRepository } from '../../repositories/history.repository';
import { HistoryFindManyDto } from '../../domain/dto/history-find-many.dto';
import { HistoryFilter } from './components/history-filter';
import { HistoryTable } from './components/history-table';

export function HistoryList() {
  const historyRepository = new HistoryRepository();

  const { user } = useAuth();

  const isBarber: boolean =
    user?.role?.reference === ERoleReference.PROFESSIONAL;
  const isClient: boolean = user?.role?.reference === ERoleReference.CLIENT;

  const [params, setParams] = useState<HistoryFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    barberId: isBarber ? user?.id : undefined,
    clientId: isClient ? user?.id : undefined,
  });

  const { data, isLoading, mutate } = useSWR(
    ['histories', params],
    ([, value]) => historyRepository.findMany(value),
  );

  function handleFilter(filter: Partial<HistoryFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Históricos" />
      </PageHeader>
      <PageContent>
        <HistoryFilter onFilter={handleFilter} />
        <HistoryTable
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
