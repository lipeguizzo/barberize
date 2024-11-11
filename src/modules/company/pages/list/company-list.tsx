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
import { CompanyFindManyDto } from '../../domain/dto/company-find-many.dto';
import { CompanyRepository } from '../../repositories/company.repository';
import { CompanyFilter } from './components/company-filter';
import { CompanyTable } from './components/company-table';

export function CompanyList() {
  const { canCreate } = useUserAbility();

  const companyRepository = new CompanyRepository();

  const [params, setParams] = useState<CompanyFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    includeDeleted: false,
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(
    ['companies', params],
    ([, value]) => companyRepository.findMany(value),
  );

  function handleFilter(filter: Partial<CompanyFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Empresas" />
        <PageButtons>
          {canCreate(EAbilityCode.COMPANIES) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <CompanyFilter onFilter={handleFilter} />
        <CompanyTable
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
