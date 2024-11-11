import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Campo obrigatório!')
    .email({ message: 'E-mail inválido!' })
    .trim(),
  password: z
    .string()
    .min(
      1,
      'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
    )
    .trim(),
});

export type AuthLoginData = z.infer<typeof AuthLoginSchema>;
