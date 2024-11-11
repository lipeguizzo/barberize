/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
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
import { CompanyUpdateDto } from '../../domain/dto/company-update.dto';
import { CompanyEntity } from '../../domain/entities/company.entity';
import {
  CompanyUpdateData,
  CompanyUpdateSchema,
} from '../../domain/schemas/company-update.schema';
import { CompanyRepository } from '../../repositories/company.repository';
import { CompanyForm } from '../components/company-form';
import { createFileFromUUID } from '@/shared/utils/file';

export function CompanyUpdate() {
  const { id } = useParams();
  const { canUpdate, canDelete } = useUserAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const companyRepository = new CompanyRepository();

  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<CompanyUpdateData>({
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
    resolver: zodResolver(CompanyUpdateSchema),
  });

  async function submit(data: CompanyUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: CompanyUpdateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        status: data.status,
        address: data.address,
      };

      const company = await companyRepository.update(id as ID, dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await companyRepository.updateAvatar(company.id, formData);
        } else {
          await companyRepository.deleteAvatar(company.id);
        }
      }

      toast.success('Empresa atualizada com sucesso!');

      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
      const company: CompanyEntity = await companyRepository.findOne(id);
      const avatarFile = company.avatar
        ? await createFileFromUUID(company.avatar.uuid)
        : null;
      methods.reset({
        ...company,
        avatar: avatarFile,
      });
      setInitialAvatar(avatarFile);
    } catch {
      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
        await companyRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.COMPANIES}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.COMPANIES}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle backPath={EAuthenticatedPath.COMPANIES} title="Empresas" />

        <PageButtons>
          {canDelete(EAbilityCode.COMPANIES) && (
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
          {canUpdate(EAbilityCode.COMPANIES) && (
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
          <CompanyForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
