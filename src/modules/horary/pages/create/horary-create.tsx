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
import { HoraryCreateDto } from '../../domain/dto/horary-create.dto';
import {
  HoraryCreateData,
  HoraryCreateSchema,
} from '../../domain/schemas/horary-create.schema';
import { HoraryRepository } from '../../repositories/horary.repository';
import { HoraryForm } from '../components/horary-form';

export function HoraryCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const horaryRepository = new HoraryRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HoraryCreateData>({
    defaultValues: {
      time: '',
      isAvailable: false,
    },
    resolver: zodResolver(HoraryCreateSchema),
  });

  async function submit(data: HoraryCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HoraryCreateDto = {
        time: data.time,
        isAvailable: data.isAvailable,
        companyId: user?.companyId ?? undefined,
      };

      await horaryRepository.create(dto);

      toast.success('Horário cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.HOURS}`);
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
        <PageTitle backPath={EAuthenticatedPath.HOURS} title="Horários" />

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
          <HoraryForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
