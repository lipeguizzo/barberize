/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
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
import { HaircutUpdateDto } from '../../domain/dto/haircut-update.dto';
import { HaircutEntity } from '../../domain/entities/haircut.entity';
import {
  HaircutUpdateData,
  HaircutUpdateSchema,
} from '../../domain/schemas/haircut-update.schema';
import { HaircutRepository } from '../../repositories/haircut.repository';
import { HaircutForm } from '../components/haircut-form';

export function HaircutUpdate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const haircutRepository = new HaircutRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HaircutUpdateData>({
    defaultValues: {
      name: '',
      price: 0.0,
      duration: 0,
    },
    resolver: zodResolver(HaircutUpdateSchema),
  });

  async function submit(data: HaircutUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HaircutUpdateDto = {
        name: data.name,
        price: data.price,
        duration: data.duration,
        companyId: user?.companyId ?? undefined,
      };

      await haircutRepository.update(id as ID, dto);

      toast.success('Corte atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.HAIRCUTS}`);
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
      const haircut: HaircutEntity = await haircutRepository.findOne(id);
      methods.reset({
        ...haircut,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.HAIRCUTS}`);
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
        await haircutRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.HAIRCUTS}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.HAIRCUTS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle backPath={EAuthenticatedPath.HAIRCUTS} title="Cortes" />

        <PageButtons>
          {canDelete(EAbilityCode.HAIRCUTS) && (
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
          {canUpdate(EAbilityCode.HAIRCUTS) && (
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
          <HaircutForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
