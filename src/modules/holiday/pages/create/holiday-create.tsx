import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
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
import { HolidayCreateDto } from '../../domain/dto/holiday-create.dto';
import {
  HolidayCreateData,
  HolidayCreateSchema,
} from '../../domain/schemas/holiday-create.schema';
import { HolidayRepository } from '../../repositories/holiday.repository';
import { HolidayForm } from '../components/holiday-form';

export function HolidayCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const holidayRepository = new HolidayRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HolidayCreateData>({
    defaultValues: {
      name: '',
      dayMonth: '',
    },
    resolver: zodResolver(HolidayCreateSchema),
  });

  async function submit(data: HolidayCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HolidayCreateDto = {
        name: data.name,
        dayMonth: data.dayMonth,
        companyId: user?.companyId ?? undefined,
      };

      await holidayRepository.create(dto);

      toast.success('Feriado cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.HOLIDAYS}`);
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
        <PageTitle backPath={EAuthenticatedPath.HOLIDAYS} title="Feriados" />

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
          <HolidayForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
