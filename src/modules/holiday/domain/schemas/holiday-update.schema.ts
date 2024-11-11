import { z } from 'zod';

export const HolidayUpdateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  dayMonth: z.string().min(5, 'Campo obrigatório!').trim(),
});

export type HolidayUpdateData = z.infer<typeof HolidayUpdateSchema>;
