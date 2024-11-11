import { HolidayEntity } from '@/modules/holiday/domain/entities/holiday.entity';
import { DataTable } from '@/shared/components/data-table/data-table';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { Sort } from '@/shared/types/sort';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IPaginationResponse<HolidayEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function HolidayTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'dayMonth', headerName: 'Dia e Mês', width: 150 },
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
