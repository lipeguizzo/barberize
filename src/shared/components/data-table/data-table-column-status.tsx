import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { IStatus } from '@/shared/domain/interfaces/status.interface';
import { isInEnum } from '@/shared/utils/string';
import { Chip, ChipProps } from '@mui/material';

interface Props extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
  value: string;
}

export function DataTableColumnStatus({ value, ...props }: Props) {
  const statusMap: Record<EStatus, IStatus> = {
    [EStatus.ACTIVE]: {
      color: 'success',
      label: EStatusTranslate[EStatus.ACTIVE],
    },
    [EStatus.BLOCKED]: {
      color: 'primary',
      label: EStatusTranslate[EStatus.BLOCKED],
    },
    [EStatus.DISABLED]: {
      color: 'default',
      label: EStatusTranslate[EStatus.DISABLED],
    },
    [EStatus.WAITING]: {
      color: 'secondary',
      label: EStatusTranslate[EStatus.WAITING],
    },
  };

  if (isInEnum(value, EStatus)) {
    const status = statusMap[value as EStatus];
    return (
      <Chip
        color={status.color}
        label={status.label.toUpperCase()}
        {...props}
      />
    );
  }
}
