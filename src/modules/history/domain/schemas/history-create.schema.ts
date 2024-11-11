import { z } from 'zod';

export const HistoryCreateSchema = z.object({
  action: z.string().min(1, { message: 'Campo obrigatório!' }),
  schedulingId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type HistoryCreateData = z.infer<typeof HistoryCreateSchema>;
