import { Rating, RatingProps } from '@mui/material';

interface Props extends Omit<RatingProps, 'defaultValue'> {
  value: number;
}

export function DataTableColumnRating({ value, ...props }: Props) {
  if (typeof value === 'number') {
    return <Rating value={value} readOnly {...props} />;
  }
}
