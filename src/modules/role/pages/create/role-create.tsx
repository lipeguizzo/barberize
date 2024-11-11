import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { formatErrorForNotification } from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoleCreateDto } from '../../domain/dto/role-create.dto';
import {
  RoleCreateData,
  RoleCreateSchema,
} from '../../domain/schemas/role-create.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { AbilityForm } from '../components/ability-form';
import { RoleForm } from '../components/role-form';

export function RoleCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const roleRepository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<RoleCreateData>({
    defaultValues: {
      name: '',
      status: EStatus.ACTIVE,
      abilities: [],
    },
    resolver: zodResolver(RoleCreateSchema),
  });

  async function submit(data: RoleCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: RoleCreateDto = {
        name: data.name,
        reference: data.reference,
        companyId: user?.companyId ?? null,
        status: data.status,
        abilitiesIds: data.abilities.map((ability) => ability.id),
      };

      await roleRepository.create(dto);

      toast.success('Perfil cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.ROLES}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          backPath={EAuthenticatedPath.ROLES}
          title="Perfil de Usuários"
        />

        <PageButtons>
          <Button
            onClick={methods.handleSubmit(submit)}
            color="success"
            variant="contained"
            size="large"
            disabled={!isValid}
            sx={{ width: '200px' }}
          >
            Salvar
          </Button>
        </PageButtons>
      </PageHeader>

      <PageContent>
        <FormProvider {...methods}>
          <RoleForm />
          <AbilityForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
