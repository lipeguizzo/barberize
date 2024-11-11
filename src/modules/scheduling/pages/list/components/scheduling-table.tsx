import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { HaircutEntity } from '@/modules/haircut/domain/entities/haircut.entity';
import { HistoryRepository } from '@/modules/history/repositories/history.repository';
import { HoraryEntity } from '@/modules/horary/domain/entities/horary.entity';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { SchedulingEntity } from '@/modules/scheduling/domain/entities/scheduling.entity';
import { EScheduleStatus } from '@/modules/scheduling/domain/enums/schedule-status.enum';
import { SchedulingRepository } from '@/modules/scheduling/repositories/scheduling.repository';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { CompleteButton } from '@/shared/components/buttons/complete-button';
import { ConfirmButton } from '@/shared/components/buttons/confirm-button';
import { DeleteButton } from '@/shared/components/buttons/delete-button';
import { WhatsAppButton } from '@/shared/components/buttons/whatsapp-button';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnSchedulingStatus } from '@/shared/components/data-table/data-table-column-scheduling-status';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { ID } from '@/shared/types/id';
import { Sort } from '@/shared/types/sort';
import { formatDate } from '@/shared/utils/date';
import {
  formatLongString,
  removeSpecialCharacters,
} from '@/shared/utils/string';
import { Box } from '@mui/material';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  data: IPaginationResponse<SchedulingEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function SchedulingTable({
  data,
  loading,
  pagination,
  onChangePagination,
  reload,
}: Props) {
  const schedulingRepository = new SchedulingRepository();
  const historyRepository = new HistoryRepository();

  const { user } = useAuth();

  const { openDialog } = useConfirmDialog();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleComplete(id: ID): Promise<void> {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja finalizar esse agendamento?',
      });

      if (confirm) {
        setIsLoading(true);
        await schedulingRepository.updateStatus(id, {
          status: EScheduleStatus.COMPLETED,
        });
        await historyRepository.create({
          action: 'Agendamento finalizado.',
          schedulingId: Number(id),
        });
        toast.success('Agendamento finalizado!');
        reload();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirm(id: ID): Promise<void> {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja confirmar esse agendamento?',
      });

      if (confirm) {
        setIsLoading(true);
        await schedulingRepository.updateStatus(id, {
          status: EScheduleStatus.CONFIRMED,
        });
        toast.success('Agendamento confirmado!');
        reload();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCancel(id: ID): Promise<void> {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja cancelar esse agendamento?',
      });

      if (confirm) {
        setIsLoading(true);
        await schedulingRepository.updateStatus(id, {
          status: EScheduleStatus.CANCELED,
        });
        await historyRepository.create({
          action: 'Agendamento cancelado.',
          schedulingId: Number(id),
        });
        toast.success('Agendamento cancelado!');
        reload();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Data',
      width: 100,
      renderCell: (params) => {
        const date: Date = new Date(params.value);
        return <>{formatDate(date)}</>;
      },
    },
    {
      field: 'horaryId',
      headerName: 'Horário',
      width: 100,
      renderCell: (params) => {
        const horary: HoraryEntity = new HoraryEntity(params.row.horary);
        return <>{horary.time}</>;
      },
    },
    {
      field: 'haircutId',
      headerName: 'Corte',
      width: 150,
      renderCell: (params) => {
        const haircut: HaircutEntity = new HaircutEntity(params.row.haircut);
        return <>{haircut.name}</>;
      },
    },
    {
      field: 'companyId',
      headerName: 'Empresa',
      width: 150,
      renderCell: (params) => {
        const company: CompanyEntity = new CompanyEntity(params.row.company);
        return <>{company.name}</>;
      },
    },
    {
      field: 'barberId',
      headerName: 'Barbeiro',
      width: 200,
      renderCell: (params) => {
        const barber: UserEntity = new UserEntity(params.row.barber);
        const phone: string = removeSpecialCharacters(barber.phone);
        return (
          <>
            {formatLongString(barber.name)}
            <WhatsAppButton tooltip="Entrar em contato" phone={phone} />
          </>
        );
      },
    },
    {
      field: 'clientId',
      headerName: 'Cliente',
      width: 150,
      renderCell: (params) => {
        const client: UserEntity = new UserEntity(params.row.client);
        return <>{client.name}</>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <DataTableColumnSchedulingStatus value={params.value} />
      ),
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 200,

      renderCell: (params) => (
        <Box
          sx={{
            padding: '5px',
            width: '100%',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {user?.role?.reference !== ERoleReference.CLIENT &&
            params.row.status === EScheduleStatus.CONFIRMED && (
              <CompleteButton
                tooltip="Finalizar agendamento"
                onClick={() => handleComplete(params.row.id)}
                hidden={params.row.status !== EScheduleStatus.CONFIRMED}
              />
            )}
          {user?.role?.reference !== ERoleReference.CLIENT &&
            params.row.status === EScheduleStatus.WAITING && (
              <ConfirmButton
                tooltip="Confirmar agendamento"
                onClick={() => handleConfirm(params.row.id)}
                disabled={params.row.status === EScheduleStatus.CONFIRMED}
              />
            )}
          <DeleteButton
            tooltip="Cancelar agendamento"
            onClick={() => handleCancel(params.row.id)}
          />
        </Box>
      ),
    },
  ];

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
    <DataTable
      data={
        data?.data.filter(
          (scheduling) =>
            scheduling.status === EScheduleStatus.CONFIRMED ||
            scheduling.status === EScheduleStatus.WAITING,
        ) ?? []
      }
      columns={columns}
      loading={loading || isLoading}
      onPaginationModelChange={onChangePagination}
      count={data?._meta.totalItems ?? 1}
      options={options}
    />
  );
}
