import { z } from 'zod';

export const HistoryUpdateSchema = z.object({
  action: z.string().min(1, { message: 'Campo obrigatório!' }),
  schedulingId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type HistoryUpdateData = z.infer<typeof HistoryUpdateSchema>;
