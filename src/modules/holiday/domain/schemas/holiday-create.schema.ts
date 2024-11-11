import { z } from 'zod';

export const HolidayCreateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  dayMonth: z.string().min(5, 'Campo obrigatório!').trim(),
});

export type HolidayCreateData = z.infer<typeof HolidayCreateSchema>;
