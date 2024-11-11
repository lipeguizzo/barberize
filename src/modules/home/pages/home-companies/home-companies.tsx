import { CompanyFindManyDto } from '@/modules/company/domain/dto/company-find-many.dto';
import { CompanyRepository } from '@/modules/company/repositories/company.repository';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { Page } from '@/shared/layout/components/page/page';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { HomeCompaniesFilter } from './components/home-companies-filter';
import { HomeCompaniesList } from './components/home-companies-list';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EStatus } from '@/shared/domain/enums/status.enum';

export function HomeCompanies() {
  const companyRepository = new CompanyRepository();

  const [params, setParams] = useState<CompanyFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    status: EStatus.ACTIVE,
    includeDeleted: false,
    findAll: true,
    search: '',
  });

  const { data, isLoading } = useSWR(['homeCompanies', params], ([, value]) =>
    companyRepository.findMany(value),
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
        <PageTitle title="Selecione uma barbearia" />
      </PageHeader>
      <PageContent>
        <HomeCompaniesFilter onFilter={handleFilter} />
        <HomeCompaniesList
          data={data}
          pagination={params}
          onChangePagination={handlePagination}
        />
      </PageContent>
      <SpinnerLoading loading={isLoading} />
    </Page>
  );
}
