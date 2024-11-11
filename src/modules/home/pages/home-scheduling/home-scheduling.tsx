/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { CompanyRepository } from '@/modules/company/repositories/company.repository';
import { SchedulingCreateDto } from '@/modules/scheduling/domain/dto/scheduling-create.dto';
import { EScheduleStatus } from '@/modules/scheduling/domain/enums/schedule-status.enum';
import {
  SchedulingCreateData,
  SchedulingCreateSchema,
} from '@/modules/scheduling/domain/schemas/scheduling-create.schema';
import { SchedulingRepository } from '@/modules/scheduling/repositories/scheduling.repository';
import { AssessmentButton } from '@/shared/components/buttons/assessment-button';
import { ShareButton } from '@/shared/components/buttons/share-button';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { Page } from '@/shared/layout/components/page/page';
import { PageButtons } from '@/shared/layout/components/page/page-buttons';
import { PageContent } from '@/shared/layout/components/page/page-content';
import { PageHeader } from '@/shared/layout/components/page/page-header';
import { PageTitle } from '@/shared/layout/components/page/page-title';
import { formatErrorForNotification } from '@/shared/utils/error';
import { createFileFromUUID, createFileURL } from '@/shared/utils/file';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomeSchedulingForm } from './components/home-scheduling-form';
import { AssessmentRepository } from '@/modules/assessment/repositories/assessment.repository';

export function HomeScheduling() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const schedulingRepository = new SchedulingRepository();
  const companyRepository = new CompanyRepository();
  const assessmentRepository = new AssessmentRepository();

  const [company, setCompany] = useState<CompanyEntity | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [assessmentNote, setAssessmentNote] = useState<number>(0);

  const queryParams = new URLSearchParams(location.search);
  const companyName: string | null = queryParams.get('companyName');

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<SchedulingCreateData>({
    defaultValues: {
      date: new Date(),
    },
    resolver: zodResolver(SchedulingCreateSchema),
  });

  async function submit(data: SchedulingCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: SchedulingCreateDto = {
        date: data.date,
        horaryId: data.horaryId,
        haircutId: data.haircutId,
        barberId: data.barberId,
        companyId: company?.id,
        clientId: user?.id ?? undefined,
        status: EScheduleStatus.WAITING,
      };

      await schedulingRepository.create(dto);

      toast.success('Agendamento marcado com sucesso!');

      navigate(`/${EAuthenticatedPath.SCHEDULINGS}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function findByName(name: string) {
    try {
      setLoading(true);

      const data = await companyRepository.findName(name);
      setCompany(data);

      const { note } = await assessmentRepository.findCompanyNote(data.id);
      setAssessmentNote(note);

      if (data?.avatar) {
        const file = await createFileFromUUID(String(data?.avatar?.uuid));
        setAvatarUrl(createFileURL(file));
      }
    } catch {
      navigate(`/${EAuthenticatedPath.HOME}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!companyName) {
      navigate(`/${EAuthenticatedPath.HOME}`);
    } else {
      findByName(companyName);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Marque seu agendamento" backPath={`home`} />
        <PageButtons>
          <ShareButton
            tooltip="Compartilhar"
            companyName={String(companyName)}
          />
          <AssessmentButton tooltip="Avaliar" companyId={Number(company?.id)} />
        </PageButtons>
      </PageHeader>
      <PageContent>
        <Stack
          sx={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box margin={1} textAlign="center" width="100%">
            {company?.avatar ? (
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'contain',
                  borderRadius: '5px',
                }}
                alt="avatar"
                src={avatarUrl ?? ''}
              />
            ) : (
              <Typography variant="h2" component="h2">
                {company?.name}
              </Typography>
            )}
            <Rating value={assessmentNote} readOnly={true} />
            <Typography variant="h4" component="h4">
              Agende seu horário
            </Typography>
            <Typography variant="h6" component="h6">
              Escolha o profissional e o corte que você preferir e agende no
              horário que desejar
            </Typography>
          </Box>
          <Box margin={1} width="100%">
            <FormProvider {...methods}>
              <HomeSchedulingForm companyId={Number(company?.id)} />
            </FormProvider>
          </Box>
          <Box marginX={1} width="100%">
            <Container>
              <Box marginX={3}>
                <Button
                  onClick={methods.handleSubmit(submit)}
                  color="success"
                  variant="contained"
                  size="large"
                  disabled={!isValid}
                  fullWidth
                >
                  Agendar
                </Button>
              </Box>
            </Container>
          </Box>
        </Stack>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
