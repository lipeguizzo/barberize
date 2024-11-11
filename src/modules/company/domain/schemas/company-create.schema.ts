import { EStatus } from '@/shared/domain/enums/status.enum';
import { AddressCreateSchema } from '@/shared/domain/schemas/address.schema';
import { z } from 'zod';

export const CompanyCreateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  tradeName: z.string().min(1, 'Campo obrigatório!').trim(),
  email: z
    .string()
    .min(1, 'Campo obrigatório!')
    .email({ message: 'E-mail inválido!' })
    .trim(),
  status: z.nativeEnum(EStatus, { message: 'Campo obrigatório!' }),
  avatar: z.instanceof(File).optional().nullable(),
  address: AddressCreateSchema,
});

export type CompanyCreateData = z.infer<typeof CompanyCreateSchema>;
