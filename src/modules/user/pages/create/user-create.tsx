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
import { EGender } from '../../domain/enums/gender.enum';
import {
  UserCreateData,
  UserCreateSchema,
} from '../../domain/schemas/user-create.schema';
import { UserRepository } from '../../repositories/user.repository';
import { UserForm } from '../components/user-form';
import { UserCreateDto } from '../../domain/dto/user-create.dto';

export function UserCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserCreateData>({
    defaultValues: {
      name: '',
      email: '',
      gender: EGender.M,
      phone: '',
      password: '',
      confirm: '',
      status: EStatus.ACTIVE,
    },
    resolver: zodResolver(UserCreateSchema),
  });

  async function submit(data: UserCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserCreateDto = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        roleId: data.roleId,
        companyId: user?.companyId ?? undefined,
        status: data.status,
      };

      await userRepository.create(dto);

      toast.success('Usuário cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.USERS}`);
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
        <PageTitle backPath={EAuthenticatedPath.USERS} title="Usuários" />

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
          <UserForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
