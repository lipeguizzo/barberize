import { z } from 'zod';

export const HoraryCreateSchema = z.object({
  time: z.string().min(5, 'Campo obrigatório!').trim(),
  isAvailable: z.coerce.boolean({ message: 'Campo obrigatório!' }),
});

export type HoraryCreateData = z.infer<typeof HoraryCreateSchema>;
