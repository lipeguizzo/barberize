import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '@/modules/role/domain/enums/role-reference.enum';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnBoolean } from '@/shared/components/data-table/data-table-column-boolean';
import { DataTableColumnStatus } from '@/shared/components/data-table/data-table-column-status';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { Sort } from '@/shared/types/sort';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  data: IPaginationResponse<RoleEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function RoleTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'isDefault',
      headerName: 'Padrão',
      width: 100,
      renderCell: (params) => <DataTableColumnBoolean value={params.value} />,
    },
    { field: 'name', headerName: 'Nome', width: 150 },
    {
      field: 'reference',
      headerName: 'Referência',
      width: 150,
      renderCell: (params) => (
        <>{ERoleReferenceTranslate[params.value as ERoleReference]}</>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <DataTableColumnStatus value={params.value} />,
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const isDefault = params.row.isDefault;
    if (isDefault) {
      toast.warning('Perfil padrão, não possível atualizar ou deletar!');
    } else {
      const id = params.row.id;
      navigate(`${id}`);
    }
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
    <DataTable
      data={data?.data ?? []}
      columns={columns}
      loading={loading}
      onRowClick={handleRowClick}
      onPaginationModelChange={onChangePagination}
      count={data?._meta.totalItems ?? 1}
      options={options}
    />
  );
}
