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
import { HaircutFindManyDto } from '../../domain/dto/haircut-find-many.dto';
import { HaircutRepository } from '../../repositories/haircut.repository';
import { HaircutFilter } from './components/haircut-filter';
import { HaircutTable } from './components/haircut-table';

export function HaircutList() {
  const { canCreate } = useUserAbility();

  const haircutRepository = new HaircutRepository();

  const [params, setParams] = useState<HaircutFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    includeDeleted: false,
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(
    ['haircuts', params],
    ([, value]) => haircutRepository.findMany(value),
  );

  function handleFilter(filter: Partial<HaircutFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Cortes" />
        <PageButtons>
          {canCreate(EAbilityCode.HAIRCUTS) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <HaircutFilter onFilter={handleFilter} />
        <HaircutTable
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
