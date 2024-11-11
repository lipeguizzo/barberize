/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { useUserAbility } from '@/shared/hooks/use-user-ability';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { formatErrorForNotification } from '@/shared/utils/error';
import { createFileFromUUID } from '@/shared/utils/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserUpdateSelfDto } from '../../domain/dto/user-update-self.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  UserUpdateSelfData,
  UserUpdateSelfSchema,
} from '../../domain/schemas/user-update-self.schema';
import { UserSelfForm } from './components/user-self-form';

export function UserSettings() {
  const { user } = useAuth();
  const { canUpdate } = useUserAbility();
  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserUpdateSelfData>({
    defaultValues: {
      name: '',
      email: '',
      gender: EGender.M,
      phone: '',
      password: '',
      confirm: '',
      status: EStatus.ACTIVE,
      avatar: null,
    },
    resolver: zodResolver(UserUpdateSelfSchema),
  });

  async function submit(data: UserUpdateSelfData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserUpdateSelfDto = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        roleId: data.roleId,
        companyId: user?.companyId ?? undefined,
        status: data.status,
      };

      await userRepository.updateSelf(dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await userRepository.updateAvatar(formData);
        } else {
          await userRepository.deleteAvatar();
        }
      }

      toast.success('Usuário atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.USERS}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function findSelf() {
    try {
      setLoading(true);
      const user: UserEntity = await userRepository.findSelf();
      const avatarFile = user.avatar
        ? await createFileFromUUID(user.avatar.uuid)
        : null;
      methods.reset({
        ...user,
        password: '',
        confirm: '',
        avatar: avatarFile,
      });
      setInitialAvatar(avatarFile);
    } catch {
      navigate(`/${EAuthenticatedPath.HOME}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findSelf();
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Configurações" />

        <PageButtons>
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
          <UserSelfForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
