import { WorkingDayEntity } from '@/modules/working-day/domain/entities/working-day.entity';
import {
  EDayOfWeek,
  EDayOfWeekTranslate,
} from '@/modules/working-day/domain/enums/day-of-week.enum';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnBoolean } from '@/shared/components/data-table/data-table-column-boolean';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { Sort } from '@/shared/types/sort';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IPaginationResponse<WorkingDayEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function WorkingDayTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'day',
      headerName: 'Dia de trabalho',
      width: 150,
      renderCell: (params) => (
        <>{EDayOfWeekTranslate[params.value as EDayOfWeek]}</>
      ),
    },
    {
      field: 'isOpen',
      headerName: 'Aberto',
      width: 150,
      renderCell: (params) => <DataTableColumnBoolean value={params.value} />,
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
