import { z } from 'zod';

export const SchedulingUpdateSchema = z.object({
  date: z.coerce.date({ message: 'Campo obrigatório!' }),
  horaryId: z.coerce.number({ message: 'Campo obrigatório!' }),
  haircutId: z.coerce.number({ message: 'Campo obrigatório!' }),
  barberId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type SchedulingUpdateData = z.infer<typeof SchedulingUpdateSchema>;
