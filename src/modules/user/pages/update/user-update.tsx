/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { ID } from '@/shared/types/id';
import { formatErrorForNotification } from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserUpdateDto } from '../../domain/dto/user-update.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { EGender } from '../../domain/enums/gender.enum';
import {
  UserUpdateData,
  UserUpdateSchema,
} from '../../domain/schemas/user-update.schema';
import { UserRepository } from '../../repositories/user.repository';
import { UserForm } from '../components/user-form';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';

export function UserUpdate() {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserUpdateData>({
    defaultValues: {
      name: '',
      email: '',
      gender: EGender.M,
      phone: '',
      password: '',
      confirm: '',
      status: EStatus.ACTIVE,
    },
    resolver: zodResolver(UserUpdateSchema),
  });

  async function submit(data: UserUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserUpdateDto = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        roleId: data.roleId,
        companyId: user?.companyId ?? undefined,
        status: data.status,
      };

      await userRepository.update(id as ID, dto);

      toast.success('Usuário atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.USERS}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function findById(id: ID) {
    try {
      setLoading(true);
      const user: UserEntity = await userRepository.findOne(id);
      methods.reset({
        ...user,
        password: '',
        confirm: '',
      });
    } catch {
      navigate(`/${EAuthenticatedPath.USERS}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmDelete() {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja deletar esse item?',
      });

      if (confirm) {
        await userRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        if (Number(id) === user?.id) {
          logout();
        } else {
          navigate(`/${EAuthenticatedPath.USERS}`);
        }
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.USERS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle backPath={EAuthenticatedPath.USERS} title="Usuários" />

        <PageButtons>
          {canDelete(EAbilityCode.USERS) && (
            <Button
              onClick={handleConfirmDelete}
              color="error"
              size="large"
              variant="contained"
              sx={{ width: '200px' }}
            >
              Excluir
            </Button>
          )}
          {canUpdate(EAbilityCode.USERS) && (
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
          )}
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
