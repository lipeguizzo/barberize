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
import { HolidayUpdateDto } from '../../domain/dto/holiday-update.dto';
import { HolidayEntity } from '../../domain/entities/holiday.entity';
import {
  HolidayUpdateData,
  HolidayUpdateSchema,
} from '../../domain/schemas/holiday-update.schema';
import { HolidayRepository } from '../../repositories/holiday.repository';
import { HolidayForm } from '../components/holiday-form';

export function HolidayUpdate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const holidayRepository = new HolidayRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HolidayUpdateData>({
    defaultValues: {
      name: '',
      dayMonth: '',
    },
    resolver: zodResolver(HolidayUpdateSchema),
  });

  async function submit(data: HolidayUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HolidayUpdateDto = {
        name: data.name,
        dayMonth: data.dayMonth,
        companyId: user?.companyId ?? 0,
      };

      await holidayRepository.update(id as ID, dto);

      toast.success('Feriado atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.HOLIDAYS}`);
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
      const holiday: HolidayEntity = await holidayRepository.findOne(id);
      methods.reset({
        ...holiday,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.HOLIDAYS}`);
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
        await holidayRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.HOLIDAYS}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.HOLIDAYS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle backPath={EAuthenticatedPath.HOLIDAYS} title="Feriados" />

        <PageButtons>
          {canDelete(EAbilityCode.HOLIDAYS) && (
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
          {canUpdate(EAbilityCode.HOLIDAYS) && (
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
          <HolidayForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
