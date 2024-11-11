import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { AddressOptionalSchema } from '@/shared/domain/schemas/address-optional.schema';
import { z } from 'zod';

export const AuthRegisterSchema = z
  .object({
    name: z.string().min(1, 'Campo obrigatório!').trim(),
    email: z
      .string()
      .min(1, 'Campo obrigatório!')
      .email({ message: 'E-mail inválido!' })
      .trim(),
    gender: z.nativeEnum(EGender, { message: 'Campo obrigatório!' }),
    phone: z.string().min(15, 'Campo obrigatório!').trim(),
    reference: z.nativeEnum(ERoleReference, { message: 'Campo obrigatório!' }),
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
    companyName: z.string().optional(),
    companyTradeName: z.string().optional(),
    companyEmail: z.string().optional(),
    address: AddressOptionalSchema.optional(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas diferentes!',
    path: ['confirm'],
  })
  .superRefine(
    (
      { reference, companyName, companyTradeName, companyEmail, address },
      ctx,
    ) => {
      if (reference === ERoleReference.ADMIN_COMPANY) {
        if (companyName === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['companyName'],
          });
        if (companyTradeName === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['companyTradeName'],
          });
        if (companyEmail === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['companyEmail'],
          });
        if (address?.state === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.state'],
          });
        if (address?.city === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.city'],
          });
        if (address?.street === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.street'],
          });
        if (address?.neighborhood === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.neighborhood'],
          });
      }
    },
  );

export type AuthRegisterData = z.infer<typeof AuthRegisterSchema>;
