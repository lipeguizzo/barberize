import { Chip, ChipProps } from '@mui/material';

interface Props extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
  value: boolean;
}

export function DataTableColumnBoolean({ value, ...props }: Props) {
  if (typeof value === 'boolean') {
    return (
      <Chip
        color={value ? 'success' : 'error'}
        label={value ? 'SIM' : 'NÃO'}
        {...props}
      />
    );
  }
}
