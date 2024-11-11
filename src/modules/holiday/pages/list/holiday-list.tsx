import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { LinkButton } from '@/shared/components/buttons/link-button';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { HolidayFindManyDto } from '../../domain/dto/holiday-find-many.dto';
import { HolidayRepository } from '../../repositories/holiday.repository';
import { HolidayFilter } from './components/holiday-filter';
import { HolidayTable } from './components/holiday-table';

export function HolidayList() {
  const { canCreate } = useUserAbility();

  const holidayRepository = new HolidayRepository();

  const [params, setParams] = useState<HolidayFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(
    ['holidays', params],
    ([, value]) => holidayRepository.findMany(value),
  );

  function handleFilter(filter: Partial<HolidayFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Feriados" />
        <PageButtons>
          {canCreate(EAbilityCode.HOLIDAYS) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <HolidayFilter onFilter={handleFilter} />
        <HolidayTable
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
