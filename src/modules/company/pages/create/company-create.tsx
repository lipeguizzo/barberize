import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { EStatus } from '@/shared/domain/enums/status.enum';
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
import { CompanyCreateDto } from '../../domain/dto/company-create.dto';
import {
  CompanyCreateData,
  CompanyCreateSchema,
} from '../../domain/schemas/company-create.schema';
import { CompanyRepository } from '../../repositories/company.repository';
import { CompanyForm } from '../components/company-form';

export function CompanyCreate() {
  const navigate = useNavigate();

  const companyRepository = new CompanyRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<CompanyCreateData>({
    defaultValues: {
      name: '',
      tradeName: '',
      email: '',
      status: EStatus.ACTIVE,
      avatar: null,
      address: {
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        complement: '',
      },
    },
    resolver: zodResolver(CompanyCreateSchema),
  });

  async function submit(data: CompanyCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: CompanyCreateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        status: data.status,
        address: data.address,
      };

      const company = await companyRepository.create(dto);
      const avatarChanged: boolean = data.avatar !== null;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await companyRepository.updateAvatar(company.id, formData);
        } else {
          await companyRepository.deleteAvatar(company.id);
        }
      }

      toast.success('Empresa cadastrada com sucesso!');

      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
        <PageTitle backPath={EAuthenticatedPath.COMPANIES} title="Empresas" />

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
          <CompanyForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
