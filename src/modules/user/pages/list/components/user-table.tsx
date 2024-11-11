import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  EGender,
  EGenderTranslate,
} from '@/modules/user/domain/enums/gender.enum';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnStatus } from '@/shared/components/data-table/data-table-column-status';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { Sort } from '@/shared/types/sort';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IPaginationResponse<UserEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function UserTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 150 },
    {
      field: 'gender',
      headerName: 'Gênero',
      width: 150,
      renderCell: (params) => <>{EGenderTranslate[params.value as EGender]}</>,
    },
    {
      field: 'role',
      headerName: 'Perfil',
      width: 150,
      renderCell: (params) => <>{params.value.name}</>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <DataTableColumnStatus value={params.value} />,
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const id = params.row.id;
    navigate(`${id}`);
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
