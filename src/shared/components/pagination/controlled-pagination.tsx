import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useState } from 'react';

interface Props {
  variant?: 'outlined' | 'text';
  color?: 'standard' | 'secondary' | 'primary';
  firstPage: number;
  count: number;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
}
export function ControlledPagination({
  variant,
  color,
  firstPage,
  count,
  pagination,
  onChangePagination,
}: Props) {
  const [page, setPage] = useState(firstPage);
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onChangePagination({
      ...pagination,
      page: value,
    });
    setPage(value);
  };

  return count <= 0 ? (
    <Typography variant="body1" component="p">
      Sem resultados!
    </Typography>
  ) : (
    <Pagination
      count={count}
      page={page}
      onChange={handleChange}
      variant={variant}
      color={color}
    />
  );
}
