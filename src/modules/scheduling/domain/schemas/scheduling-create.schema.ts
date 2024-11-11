import { z } from 'zod';

export const SchedulingCreateSchema = z.object({
  date: z.coerce.date({ message: 'Campo obrigatório!' }),
  horaryId: z.coerce.number({ message: 'Campo obrigatório!' }),
  haircutId: z.coerce.number({ message: 'Campo obrigatório!' }),
  barberId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type SchedulingCreateData = z.infer<typeof SchedulingCreateSchema>;
