import {
  EScheduleStatus,
  EScheduleStatusTranslate,
} from '@/modules/scheduling/domain/enums/schedule-status.enum';
import { IStatus } from '@/shared/domain/interfaces/status.interface';
import { isInEnum } from '@/shared/utils/string';
import { Chip, ChipProps } from '@mui/material';

interface Props extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
  value: string;
}

export function DataTableColumnSchedulingStatus({ value, ...props }: Props) {
  const statusMap: Record<EScheduleStatus, IStatus> = {
    [EScheduleStatus.CONFIRMED]: {
      color: 'success',
      label: EScheduleStatusTranslate[EScheduleStatus.CONFIRMED],
    },
    [EScheduleStatus.COMPLETED]: {
      color: 'success',
      label: EScheduleStatusTranslate[EScheduleStatus.COMPLETED],
    },
    [EScheduleStatus.CANCELED]: {
      color: 'error',
      label: EScheduleStatusTranslate[EScheduleStatus.CANCELED],
    },
    [EScheduleStatus.WAITING]: {
      color: 'secondary',
      label: EScheduleStatusTranslate[EScheduleStatus.WAITING],
    },
  };

  if (isInEnum(value, EScheduleStatus)) {
    const status = statusMap[value as EScheduleStatus];
    return (
      <Chip
        color={status.color}
        label={status.label.toUpperCase()}
        {...props}
      />
    );
  }
}
