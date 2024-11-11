/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Chip, ChipProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { HoraryEntity } from '@/modules/horary/domain/entities/horary.entity';
import { SchedulingRepository } from '@/modules/scheduling/repositories/scheduling.repository';
import { formatDateEn } from '@/shared/utils/date';
import { formatErrorForNotification } from '@/shared/utils/error';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface Props
  extends UseControllerProps<any>,
    Omit<ChipProps<any>, 'defaultValue' | 'name'> {
  companyId: number;
  barberId: number;
  date: Date;
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

export function ControlledHorary({
  companyId,
  barberId,
  date,
  color = 'secondary',
  ...props
}: Props) {
  const {
    field: { value, onChange },
  } = useController(props);

  const schedulingRepository = new SchedulingRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [hours, setHours] = useState<HoraryEntity[]>([]);

  function handleChange(horary: HoraryEntity | null) {
    onChange(horary?.id);
  }

  async function getSchedulings() {
    if (loading) return;

    try {
      setLoading(true);
      handleChange(null);
      const data = await schedulingRepository.findHours({
        date: formatDateEn(dayjs(date).toDate()),
        companyId,
        barberId,
      });

      setHours(data);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!companyId) return;
    getSchedulings();
  }, [companyId, date]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {hours.map((horary) => {
        return (
          <Chip
            key={horary.id}
            label={horary.time}
            variant={value === horary.id ? 'filled' : 'outlined'}
            color={color}
            onClick={() => handleChange(horary)}
          />
        );
      })}
    </Box>
  );
}
