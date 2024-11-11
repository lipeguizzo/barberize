import { z } from 'zod';

export const HaircutUpdateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  price: z.coerce.number({ message: 'Campo obrigatório!' }),
  duration: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type HaircutUpdateData = z.infer<typeof HaircutUpdateSchema>;
