import { Box, Theme, useMediaQuery } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import { SpinnerLoading } from '../loadings/spinner-loading';

interface Props extends DataGridProps {
  data: GridRowsProp;
  columns: GridColDef[];
  count: number;
  loading?: boolean;
  options?: Partial<DataGridProps>;
  onRowClick?: (params: GridRowParams) => void;
}

export function DataTable({
  loading = false,
  data,
  columns,
  count,
  onRowClick,
  options,
}: Props) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const optionsCustom: Partial<DataGridProps> = {
    disableColumnFilter: true,
    disableColumnMenu: true,
    sortingOrder: ['asc', 'desc'],
    autoPageSize: false,
    pagination: true,
    paginationMode: 'server',
    pageSizeOptions: [
      { value: 10, label: '10 itens' },
      { value: 25, label: '25 itens' },
      { value: 50, label: '50 itens' },
    ],
    paginationModel: {
      page: 1,
      pageSize: 10,
    },
    localeText: {
      noRowsLabel: 'Sem resultados!',
      MuiTablePagination: {
        labelRowsPerPage: 'Itens por página',
        labelDisplayedRows: ({
          from,
          to,
          count,
        }: {
          from: number;
          to: number;
          count: number;
        }) => `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
      },
      footerRowSelected: (count: number) =>
        count !== 1 ? `${count} linhas selecionadas` : '1 linha selecionada',
    },
    onRowClick: onRowClick,
    ...options,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: isMobile ? 'auto' : '550px',
        flexGrow: 1,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 0,
      }}
    >
      <SpinnerLoading loading={loading} />
      <DataGrid
        rows={data}
        rowCount={count}
        columns={columns.map((col) => ({
          ...col,
          flex: isMobile ? 0 : 1,
        }))}
        {...optionsCustom}
      />
    </Box>
  );
}
