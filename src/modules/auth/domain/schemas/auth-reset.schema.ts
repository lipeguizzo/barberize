import { z } from 'zod';

export const AuthResetSchema = z
  .object({
    token: z.string().min(1).trim(),
    password: z
      .string()
      .min(
        1,
        'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
      )
      .trim(),
    confirm: z
      .string()
      .min(
        1,
        'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
      )
      .trim(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas diferentes!',
    path: ['confirm'],
  });

export type AuthResetData = z.infer<typeof AuthResetSchema>;
