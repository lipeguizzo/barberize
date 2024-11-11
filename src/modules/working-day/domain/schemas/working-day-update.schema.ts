import { z } from 'zod';
import { EDayOfWeek } from '../enums/day-of-week.enum';

export const WorkingDayUpdateSchema = z.object({
  day: z.nativeEnum(EDayOfWeek, { message: 'Campo obrigatório!' }),
  isOpen: z.coerce.boolean({ message: 'Campo obrigatório!' }),
});

export type WorkingDayUpdateData = z.infer<typeof WorkingDayUpdateSchema>;
