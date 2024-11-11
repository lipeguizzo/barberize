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
import { UserFindManyDto } from '../../domain/dto/user-find-many.dto';
import { UserRepository } from '../../repositories/user.repository';
import { UserFilter } from './components/user-filter';
import { UserTable } from './components/user-table';

export function UserList() {
  const { canCreate } = useUserAbility();

  const userRepository = new UserRepository();

  const [params, setParams] = useState<UserFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    includeDeleted: false,
    search: '',
  });

  const { data, isLoading, mutate } = useSWR(['users', params], ([, value]) =>
    userRepository.findMany(value),
  );

  function handleFilter(filter: Partial<UserFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Usuários" />
        <PageButtons>
          {canCreate(EAbilityCode.USERS) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <UserFilter onFilter={handleFilter} />
        <UserTable
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
