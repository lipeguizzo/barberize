/* eslint-disable react-hooks/exhaustive-deps */
import { AssessmentRepository } from '@/modules/assessment/repositories/assessment.repository';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { ControlledPagination } from '@/shared/components/pagination/controlled-pagination';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { createFileFromUUID, createFileURL } from '@/shared/utils/file';
import { formatLongString } from '@/shared/utils/string';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IPaginationResponse<CompanyEntity> | undefined;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export function HomeCompaniesList({
  data,
  pagination,
  onChangePagination,
}: Props) {
  const assessmentRepository = new AssessmentRepository();
  const navigate = useNavigate();

  const isMobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const [avatarUrls, setAvatarUrls] = useState<{ [companyId: number]: string }>(
    {},
  );

  const [assessmentNotes, setAssessmentNotes] = useState<{
    [companyId: number]: number;
  }>({});

  async function findAvatarUrls() {
    if (!data) return;

    const urls = await Promise.all(
      data.data.map(async (company) => {
        if (company.avatar?.uuid) {
          const file = await createFileFromUUID(String(company.avatar.uuid));
          return { id: company.id, url: createFileURL(file) };
        }
        return {
          id: company.id,
          url: '',
        };
      }),
    );

    const urlsMap = urls.reduce(
      (acc, { id, url }) => {
        acc[id] = url;
        return acc;
      },
      {} as { [id: string]: string },
    );

    setAvatarUrls(urlsMap);
  }

  async function findAssessmentNotes() {
    if (!data) return;

    const notes = await Promise.all(
      data.data.map(async (company) => {
        const { note } = await assessmentRepository.findCompanyNote(company.id);
        return { id: company.id, note: note };
      }),
    );

    const notesMap = notes.reduce(
      (acc, { id, note }) => {
        acc[id] = note;
        return acc;
      },
      {} as { [id: string]: number },
    );

    setAssessmentNotes(notesMap);
  }

  useEffect(() => {
    findAvatarUrls();
    findAssessmentNotes();
  }, [data]);

  return (
    <Stack width="100%" padding={1}>
      <Stack
        width="100%"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
      >
        {data?.data.map((company) => {
          return (
            <Card
              key={company.id}
              elevation={3}
              sx={{
                width: isMobile ? '100%' : '300px',
                margin: '10px',
                transition: '0.3s',
                cursor: 'pointer',
                ':hover': {
                  translate: '0px -10px',
                },
              }}
              onClick={() =>
                navigate(`agendamento?companyName=${company.name}`)
              }
            >
              <CardHeader
                title={
                  company.avatar ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {!avatarUrls[company.id] ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        <Box
                          component="img"
                          sx={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'contain',
                            borderRadius: '5px',
                          }}
                          alt="avatar"
                          src={avatarUrls[company.id]}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '150px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="h4"
                        fontWeight="bold"
                        align="center"
                      >
                        {company.tradeName}
                      </Typography>
                    </Box>
                  )
                }
              />
              <Divider />
              <CardContent
                sx={{
                  display: 'flex',
                  height: '80%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Box margin={1}>
                  <Rating
                    value={assessmentNotes[company.id] ?? 0}
                    readOnly={true}
                  />
                  <Typography variant="body1" component="p">
                    {company.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    {formatLongString(company.email)}
                  </Typography>
                </Box>
                <Divider />
                <Box margin={1}>
                  <Typography variant="body1" component="p">
                    {`${company.address?.city}, ${company.address?.state}, ${company.address?.street} , ${company.address?.neighborhood}`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
      <Stack
        width="100%"
        flexDirection="row"
        justifyContent="center"
        padding={2}
      >
        <ControlledPagination
          firstPage={pagination.page ?? 1}
          count={data?._meta.totalPages ?? 1}
          pagination={pagination}
          onChangePagination={onChangePagination}
          color="secondary"
        />
      </Stack>
    </Stack>
  );
}
