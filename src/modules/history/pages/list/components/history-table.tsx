import { HistoryEntity } from '@/modules/history/domain/entities/history.entity';
import { HistoryRepository } from '@/modules/history/repositories/history.repository';
import { SchedulingEntity } from '@/modules/scheduling/domain/entities/scheduling.entity';
import { EScheduleStatus } from '@/modules/scheduling/domain/enums/schedule-status.enum';
import { AssessmentButton } from '@/shared/components/buttons/assessment-button';
import { DeleteButton } from '@/shared/components/buttons/delete-button';
import { RedirectButton } from '@/shared/components/buttons/redirect-button';
import { ShareButton } from '@/shared/components/buttons/share-button';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnSchedulingStatus } from '@/shared/components/data-table/data-table-column-scheduling-status';
import { AddressEntity } from '@/shared/domain/entities/address.entity';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { ID } from '@/shared/types/id';
import { Sort } from '@/shared/types/sort';
import { formatDate } from '@/shared/utils/date';
import { createFileFromUUID, createFileURL } from '@/shared/utils/file';
import { Box, Container, Drawer, Typography } from '@mui/material';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  data: IPaginationResponse<HistoryEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function HistoryTable({
  data,
  loading,
  pagination,
  onChangePagination,
  reload,
}: Props) {
  const historyRepository = new HistoryRepository();

  const { openDialog } = useConfirmDialog();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [selectedHoraryId, setSelectedHoraryId] = useState<number | null>(null);
  const [selectedScheduling, setSelectedScheduling] =
    useState<SchedulingEntity | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  async function handleDelete(id: ID): Promise<void> {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja apagar esse histórico?',
      });

      if (confirm) {
        setIsLoading(true);
        await historyRepository.delete(id);
        toast.success('Histórico apagado!');
        reload();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  }

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const DrawerContainer = (): ReactNode => {
    const address: AddressEntity = new AddressEntity(
      selectedScheduling?.company?.address ?? {},
    );
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: 3,
            padding: '10px',
          }}
        >
          <DeleteButton
            tooltip="Apagar histórico"
            onClick={() => handleDelete(Number(selectedHoraryId))}
          />
          <AssessmentButton
            tooltip="Avaliar"
            companyId={Number(selectedScheduling?.company?.id)}
          />
          <ShareButton
            tooltip="Compartilhar"
            companyName={String(selectedScheduling?.company?.name)}
          />
          <RedirectButton
            tooltip="Ir para empresa"
            companyName={String(selectedScheduling?.company?.name)}
          />
        </Box>
        <Container
          onClick={toggleDrawer(false)}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            minHeight: '400px',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 3,
            }}
          >
            {selectedScheduling?.company?.avatar ? (
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
                {selectedScheduling?.company?.name}
              </Typography>
            )}
            <Typography variant="body1" component="p">
              {`${address?.city}, ${address?.state}, ${address?.street} , ${address?.neighborhood}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 3,
            }}
          >
            <Typography variant="h4" component="h3">
              {`${selectedScheduling?.horary?.time} - ${formatDate(dayjs(selectedScheduling?.date).toDate())}`}
            </Typography>
            <Typography variant="h5" component="h4">
              Barbeiro: {selectedScheduling?.barber?.name}
            </Typography>
            <Typography variant="h5" component="h4">
              Cliente: {selectedScheduling?.client?.name}
            </Typography>
          </Box>
        </Container>
      </>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Detalhes',
      width: 250,
    },
    {
      field: 'schedulingId',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const scheduling: SchedulingEntity = new SchedulingEntity(
          params.row.scheduling,
        );
        return <DataTableColumnSchedulingStatus value={scheduling.status} />;
      },
    },
  ];

  const handleRowClick = async (params: GridRowParams) => {
    setIsLoading(true);

    const scheduling: SchedulingEntity = new SchedulingEntity(
      params.row.scheduling,
    );
    setSelectedHoraryId(params.row.id);
    setSelectedScheduling(scheduling);

    if (scheduling?.company?.avatar) {
      const file = await createFileFromUUID(
        String(scheduling.company?.avatar?.uuid),
      );
      setAvatarUrl(createFileURL(file));
    }
    setIsLoading(false);
    setOpen(true);
  };

  const options: Partial<DataGridProps> = {
    paginationModel: {
      page: (pagination.page ?? 1) - 1,
      pageSize: pagination.pageSize,
    },
    onPaginationModelChange(model) {
      onChangePagination({
        ...pagination,
        page: model.page + 1,
        pageSize: model.pageSize,
      });
    },
    onSortModelChange([model]) {
      onChangePagination({
        ...pagination,
        orderBy: model.field,
        ordering: model.sort as Sort,
      });
    },
  };
  return (
    <>
      <DataTable
        data={
          data?.data.filter(
            (history) =>
              history?.scheduling?.status === EScheduleStatus.COMPLETED ||
              history?.scheduling?.status === EScheduleStatus.CANCELED,
          ) ?? []
        }
        columns={columns}
        loading={loading || isLoading}
        onRowClick={handleRowClick}
        onPaginationModelChange={onChangePagination}
        count={data?._meta.totalItems ?? 1}
        options={options}
      />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="bottom"
        PaperProps={{
          sx: {
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          },
        }}
      >
        {DrawerContainer()}
      </Drawer>
    </>
  );
}
