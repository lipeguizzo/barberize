import { AssessmentEntity } from '@/modules/assessment/domain/entities/assessment.entity';
import { AssessmentRepository } from '@/modules/assessment/repositories/assessment.repository';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { DeleteButton } from '@/shared/components/buttons/delete-button';
import { WhatsAppButton } from '@/shared/components/buttons/whatsapp-button';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnRating } from '@/shared/components/data-table/data-table-column-rating';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { ID } from '@/shared/types/id';
import { Sort } from '@/shared/types/sort';
import {
  formatLongString,
  removeSpecialCharacters,
} from '@/shared/utils/string';
import { Box } from '@mui/material';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  data: IPaginationResponse<AssessmentEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function AssessmentTable({
  data,
  loading,
  pagination,
  onChangePagination,
  reload,
}: Props) {
  const assessmentRepository = new AssessmentRepository();

  const { user } = useAuth();

  const { openDialog } = useConfirmDialog();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAdmin: boolean = user?.role?.reference === ERoleReference.ADMIN;

  async function handleDelete(id: ID): Promise<void> {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja deletar essa avaliação?',
      });

      if (confirm) {
        setIsLoading(true);
        await assessmentRepository.delete(id);
        toast.success('Avaliação deletada!');
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
      field: 'score',
      headerName: 'Avaliação',
      width: 150,
      renderCell: (params) => <DataTableColumnRating value={params.value} />,
    },
    {
      field: 'commentary',
      headerName: 'Comentário',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value === null || params.value === ''
              ? 'N/A'
              : formatLongString(params.value)}
          </>
        );
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
          <DeleteButton
            tooltip="Apagar avaliação"
            onClick={() => handleDelete(params.row.id)}
            disabled={!isAdmin && user?.id !== params.row.clientId}
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
      data={data?.data ?? []}
      columns={columns}
      loading={loading || isLoading}
      onPaginationModelChange={onChangePagination}
      count={data?._meta.totalItems ?? 1}
      options={options}
    />
  );
}
