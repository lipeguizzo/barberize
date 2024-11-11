import { z } from 'zod';
import { ERoleReference } from '../enums/role-reference.enum';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { AbilityEntity } from '../entities/ability.entity';

export const RoleUpdateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  reference: z.nativeEnum(ERoleReference, { message: 'Campo obrigatório!' }),
  abilities: z.array(z.instanceof(AbilityEntity)),
  status: z.nativeEnum(EStatus, { message: 'Campo obrigatório!' }),
});

export type RoleUpdateData = z.infer<typeof RoleUpdateSchema>;
