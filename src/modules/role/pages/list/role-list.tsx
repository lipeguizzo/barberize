import { LinkButton } from '@/shared/components/buttons/link-button';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { useState } from 'react';
import useSWR from 'swr';
import { RoleFindManyDto } from '../../domain/dto/role-find-many.dto';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleTable } from './components/role-table';
import { RoleFilter } from './components/role-filter';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import { EAbilityCode } from '../../domain/enums/ability-code.enum';

export function RoleList() {
  const { canCreate } = useUserAbility();

  const roleRepository = new RoleRepository();

  const [params, setParams] = useState<RoleFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    includeDeleted: false,
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(['roles', params], ([, value]) =>
    roleRepository.findMany(value),
  );

  function handleFilter(filter: Partial<RoleFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Perfis de usuário" />
        <PageButtons>
          {canCreate(EAbilityCode.ROLES) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <RoleFilter onFilter={handleFilter} />
        <RoleTable
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
