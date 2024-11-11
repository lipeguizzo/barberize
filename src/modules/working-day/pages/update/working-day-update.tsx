/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
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
import { WorkingDayUpdateDto } from '../../domain/dto/working-day-update.dto';
import { WorkingDayEntity } from '../../domain/entities/working-day.entity';
import { EDayOfWeek } from '../../domain/enums/day-of-week.enum';
import {
  WorkingDayUpdateData,
  WorkingDayUpdateSchema,
} from '../../domain/schemas/working-day-update.schema';
import { WorkingDayRepository } from '../../repositories/working-day.repository';
import { WorkingDayForm } from '../components/working-day-form';

export function WorkingDayUpdate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { canUpdate } = useUserAbility();
  const navigate = useNavigate();

  const workingDayRepository = new WorkingDayRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<WorkingDayUpdateData>({
    defaultValues: {
      day: EDayOfWeek.MONDAY,
      isOpen: true,
    },
    resolver: zodResolver(WorkingDayUpdateSchema),
  });

  async function submit(data: WorkingDayUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: WorkingDayUpdateDto = {
        day: data.day,
        isOpen: data.isOpen,
        companyId: user?.companyId ?? undefined,
      };

      await workingDayRepository.update(id as ID, dto);

      toast.success('Dia atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.WORKING_DAYS}`);
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
      const workingDay: WorkingDayEntity =
        await workingDayRepository.findOne(id);
      methods.reset({
        ...workingDay,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.WORKING_DAYS}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.WORKING_DAYS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          backPath={EAuthenticatedPath.WORKING_DAYS}
          title="Dias de trabalho"
        />

        <PageButtons>
          {canUpdate(EAbilityCode.WORKING_DAYS) && (
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
          <WorkingDayForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
