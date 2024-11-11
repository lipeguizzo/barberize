import { z } from 'zod';

export const HaircutCreateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  price: z.coerce.number({ message: 'Campo obrigatório!' }),
  duration: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type HaircutCreateData = z.infer<typeof HaircutCreateSchema>;
