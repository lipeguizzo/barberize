/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HolidayRepository } from '@/modules/holiday/repositories/holiday.repository';
import { SchedulingRepository } from '@/modules/scheduling/repositories/scheduling.repository';
import { EDayOfWeek } from '@/modules/working-day/domain/enums/day-of-week.enum';
import { WorkingDayRepository } from '@/modules/working-day/repositories/working-day.repository';
import { formatDateEn, formatDayMonth } from '@/shared/utils/date';
import { formatErrorForNotification } from '@/shared/utils/error';
import { Badge } from '@mui/material';
import { DateCalendar, DatePickerProps, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface Props
  extends UseControllerProps<any>,
    Omit<DatePickerProps<any>, 'defaultValue' | 'name'> {
  companyId: number;
  barberId: number;
}

export function ControlledDate({ companyId, barberId, ...props }: Props) {
  const { field } = useController(props);

  const workingDayRepository = new WorkingDayRepository();
  const holidayRepository = new HolidayRepository();
  const schedulingRepository = new SchedulingRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [workingDays, setWorkingDays] = useState<EDayOfWeek[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [unavailableDays, setUnavailableDays] = useState<string[]>([]);

  const isDisabledDates = (date: Dayjs): boolean => {
    const isSunday =
      date?.day() === 0 && !workingDays.includes(EDayOfWeek.SUNDAY);
    const isMonday =
      date?.day() === 1 && !workingDays.includes(EDayOfWeek.MONDAY);
    const isTuesday =
      date?.day() === 2 && !workingDays.includes(EDayOfWeek.TUESDAY);
    const isWednesday =
      date?.day() === 3 && !workingDays.includes(EDayOfWeek.WEDNESDAY);
    const isThursday =
      date?.day() === 4 && !workingDays.includes(EDayOfWeek.THURSDAY);
    const isFriday =
      date?.day() === 5 && !workingDays.includes(EDayOfWeek.FRIDAY);
    const isSaturday =
      date?.day() === 6 && !workingDays.includes(EDayOfWeek.SATURDAY);

    const isHolidayDisabled = holidays.some((holiday) =>
      date?.isSame(holiday, 'day'),
    );

    const isUnavailableDays = unavailableDays.some((unavailableDay) =>
      date?.isSame(unavailableDay, 'day'),
    );

    return (
      isSunday ||
      isMonday ||
      isTuesday ||
      isWednesday ||
      isThursday ||
      isFriday ||
      isSaturday ||
      isHolidayDisabled ||
      isUnavailableDays
    );
  };

  const isUnavailableDate = (date: Dayjs): boolean => {
    const formattedDate: string = formatDateEn(date.toDate());
    return unavailableDays.includes(formattedDate);
  };

  async function getWorkingDays() {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await workingDayRepository.findMany({
        companyId,
        isOpen: true,
        page: 1,
        pageSize: 25,
      });

      setWorkingDays(data.map((workingDay) => workingDay.day));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function getHolidays() {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await holidayRepository.findMany({
        companyId,
        page: 1,
        pageSize: 100,
      });

      setHolidays(data.map((holiday) => formatDayMonth(holiday.dayMonth)));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function getUnavailableDays() {
    if (loading) return;

    try {
      setLoading(true);

      const data = await schedulingRepository.findUnavailableDays({
        companyId,
        barberId,
      });

      setUnavailableDays(data.map((scheduling) => scheduling.date));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!companyId) return;
    if (!barberId) return;
    getWorkingDays();
    getHolidays();
    getUnavailableDays();
  }, [companyId, barberId]);

  if (typeof field.value === 'string') field.value = dayjs(field.value);
  if (field.value instanceof Date) field.value = dayjs(field.value);

  dayjs.locale('pt-br');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        {...props}
        {...field}
        views={['day']}
        disablePast={true}
        value={field.value ? field.value : null}
        slots={{
          day: (date, props) => {
            const isSelected = field.value?.isSame(
              dayjs(date.day).format('YYYY-MM-DD'),
              'day',
            );
            const isToday =
              dayjs(date.day).format('YYYY-MM-DD') ===
              dayjs(new Date()).format('YYYY-MM-DD');

            return (
              <Badge
                color={
                  isUnavailableDate(dayjs(date.day)) ||
                  isDisabledDates(dayjs(date.day))
                    ? 'error'
                    : 'success'
                }
                variant="dot"
                overlap="circular"
              >
                <PickersDay
                  {...props}
                  day={dayjs(date.day)}
                  today={isToday}
                  selected={isSelected}
                  disabled={isDisabledDates(dayjs(date.day))}
                  onDaySelect={(value: Dayjs | null) => {
                    field.onChange(value ? dayjs(value) : null);
                  }}
                  isFirstVisibleCell={true}
                  isLastVisibleCell={true}
                  outsideCurrentMonth={false}
                />
              </Badge>
            );
          },
        }}
      />
    </LocalizationProvider>
  );
}
