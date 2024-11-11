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
import { HoraryUpdateDto } from '../../domain/dto/horary-update.dto';
import { HoraryEntity } from '../../domain/entities/horary.entity';
import { HoraryRepository } from '../../repositories/horary.repository';
import { HoraryForm } from '../components/horary-form';
import {
  HoraryUpdateData,
  HoraryUpdateSchema,
} from '../../domain/schemas/horary-update.schema';

export function HoraryUpdate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const horaryRepository = new HoraryRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HoraryUpdateData>({
    defaultValues: {
      time: '',
      isAvailable: false,
    },
    resolver: zodResolver(HoraryUpdateSchema),
  });

  async function submit(data: HoraryUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HoraryUpdateDto = {
        time: data.time,
        isAvailable: data.isAvailable,
        companyId: user?.companyId ?? 0,
      };

      await horaryRepository.update(id as ID, dto);

      toast.success('Horário atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.HOURS}`);
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
      const horary: HoraryEntity = await horaryRepository.findOne(id);
      methods.reset({
        ...horary,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.HOURS}`);
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
        await horaryRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.HOURS}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.HOURS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle backPath={EAuthenticatedPath.HOURS} title="Horários" />

        <PageButtons>
          {canDelete(EAbilityCode.HOURS) && (
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
          {canUpdate(EAbilityCode.HOURS) && (
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
          <HoraryForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
