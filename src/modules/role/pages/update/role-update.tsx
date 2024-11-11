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
import { RoleUpdateDto } from '../../domain/dto/role-update.dto';
import { AbilityEntity } from '../../domain/entities/ability.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import { EAbilityCode } from '../../domain/enums/ability-code.enum';
import {
  RoleUpdateData,
  RoleUpdateSchema,
} from '../../domain/schemas/role-update.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { AbilityForm } from '../components/ability-form';
import { RoleForm } from '../components/role-form';

export function RoleUpdate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const roleRepository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<RoleUpdateData>({
    defaultValues: {
      name: '',
      status: EStatus.ACTIVE,
      abilities: [],
    },
    resolver: zodResolver(RoleUpdateSchema),
  });

  async function submit(data: RoleUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: RoleUpdateDto = {
        name: data.name,
        reference: data.reference,
        companyId: user?.companyId ?? null,
        status: data.status,
        abilitiesIds: data.abilities.map((ability) => ability.id),
      };

      await roleRepository.update(id as ID, dto);

      toast.success('Perfil atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.ROLES}`);
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
      const role: RoleEntity = await roleRepository.findOne(id);
      const abilities: AbilityEntity[] = await roleRepository.findAbilities(id);
      if (role.isDefault) {
        toast.warn('Perfil padrão, não possível atualizar ou deletar!');
        navigate(`/${EAuthenticatedPath.ROLES}`);
        return;
      }
      methods.reset({
        ...role,
        abilities: abilities,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.ROLES}`);
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
        await roleRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.ROLES}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.ROLES}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          backPath={EAuthenticatedPath.ROLES}
          title="Perfil de Usuários"
        />

        <PageButtons>
          {canDelete(EAbilityCode.ROLES) && (
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
          {canUpdate(EAbilityCode.ROLES) && (
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
          <RoleForm />
          <AbilityForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
