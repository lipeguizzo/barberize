import { z } from 'zod';

export const AddressCreateSchema = z.object({
  id: z.coerce.number().optional(),
  state: z.string().min(1, 'Campo obrigatório!'),
  city: z.string().min(1, 'Campo obrigatório!'),
  street: z.string().min(1, 'Campo obrigatório!'),
  neighborhood: z.string().min(1, 'Campo obrigatório!'),
  complement: z.string().optional(),
});

export type AddressCreateData = z.infer<typeof AddressCreateSchema>;
