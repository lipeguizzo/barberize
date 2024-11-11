import { z } from 'zod';
import { EDayOfWeek } from '../enums/day-of-week.enum';

export const WorkingDayCreateSchema = z.object({
  day: z.nativeEnum(EDayOfWeek, { message: 'Campo obrigatório!' }),
  isOpen: z.coerce.boolean({ message: 'Campo obrigatório!' }),
});

export type WorkingDayCreateData = z.infer<typeof WorkingDayCreateSchema>;
