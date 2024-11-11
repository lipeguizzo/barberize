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
import { HoraryFindManyDto } from '../../domain/dto/horary-find-many.dto';
import { HoraryRepository } from '../../repositories/horary.repository';
import { HoraryFilter } from './components/horary-filter';
import { HoraryTable } from './components/horary-table';

export function HoraryList() {
  const { canCreate } = useUserAbility();

  const horaryRepository = new HoraryRepository();

  const [params, setParams] = useState<HoraryFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    isAvailable: false,
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(['hours', params], ([, value]) =>
    horaryRepository.findMany(value),
  );

  function handleFilter(filter: Partial<HoraryFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Horários" />
        <PageButtons>
          {canCreate(EAbilityCode.HOURS) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <HoraryFilter onFilter={handleFilter} />
        <HoraryTable
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
