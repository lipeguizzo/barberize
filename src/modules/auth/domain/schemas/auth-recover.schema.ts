import { z } from 'zod';

export const AuthRecoverSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail obrigatório!')
    .email('E-mail inválido!')
    .trim(),
});

export type AuthRecoverData = z.infer<typeof AuthRecoverSchema>;
