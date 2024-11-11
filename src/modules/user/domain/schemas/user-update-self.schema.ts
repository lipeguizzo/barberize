import { z } from 'zod';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '../enums/gender.enum';

export const UserUpdateSelfSchema = z
  .object({
    name: z.string().min(1, 'Campo obrigatório!').trim(),
    email: z
      .string()
      .min(1, 'Campo obrigatório!')
      .email({ message: 'E-mail inválido!' })
      .trim(),
    gender: z.nativeEnum(EGender, { message: 'Campo obrigatório!' }),
    phone: z.string().min(15, 'Campo obrigatório!').trim(),
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
    status: z.nativeEnum(EStatus, { message: 'Campo obrigatório!' }),
    roleId: z.coerce.number({ message: 'Campo obrigatório!' }),
    avatar: z.instanceof(File).optional().nullable(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas diferentes!',
    path: ['confirm'],
  });

export type UserUpdateSelfData = z.infer<typeof UserUpdateSelfSchema>;
