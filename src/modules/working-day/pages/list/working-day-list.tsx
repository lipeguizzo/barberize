import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Page } from '@/shared/layout/components/page/page';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { WorkingDayFindManyDto } from '../../domain/dto/working-day-find-many.dto';
import { WorkingDayRepository } from '../../repositories/working-day.repository';
import { WorkingDayFilter } from './components/working-day-filter';
import { WorkingDayTable } from './components/working-day-table';

export function WorkingDayList() {
  const workingDayRepository = new WorkingDayRepository();

  const [params, setParams] = useState<WorkingDayFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
  });

  const { data, isLoading, mutate } = useSWR(
    ['working-days', params],
    ([, value]) => workingDayRepository.findMany(value),
  );

  function handleFilter(filter: Partial<WorkingDayFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Dias de trabalho" />
      </PageHeader>
      <PageContent>
        <WorkingDayFilter onFilter={handleFilter} />
        <WorkingDayTable
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
