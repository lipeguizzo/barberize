import { z } from 'zod';

export const HoraryUpdateSchema = z.object({
  time: z.string().min(5, 'Campo obrigatório!').trim(),
  isAvailable: z.coerce.boolean({ message: 'Campo obrigatório!' }),
});

export type HoraryUpdateData = z.infer<typeof HoraryUpdateSchema>;
