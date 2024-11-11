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
import { HaircutCreateDto } from '../../domain/dto/haircut-create.dto';
import {
  HaircutCreateData,
  HaircutCreateSchema,
} from '../../domain/schemas/haircut-create.schema';
import { HaircutRepository } from '../../repositories/haircut.repository';
import { HaircutForm } from '../components/haircut-form';

export function HaircutCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const haircutRepository = new HaircutRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<HaircutCreateData>({
    defaultValues: {
      name: '',
      price: 0.0,
      duration: 0,
    },
    resolver: zodResolver(HaircutCreateSchema),
  });

  async function submit(data: HaircutCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: HaircutCreateDto = {
        name: data.name,
        price: data.price,
        duration: data.duration,
        companyId: user?.companyId ?? undefined,
      };

      await haircutRepository.create(dto);

      toast.success('Corte cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.HAIRCUTS}`);
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
        <PageTitle backPath={EAuthenticatedPath.HAIRCUTS} title="Cortes" />

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
          <HaircutForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
