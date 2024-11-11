import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';

export interface IUserAbilityContextType {
  abilities: AbilityEntity[] | null;
  excludeReferences: () => string[];
  groupedAbilities: () => Record<string, AbilityEntity[]>;
  canRead: (code: EAbilityCode) => boolean;
  canCreate: (code: EAbilityCode) => boolean;
  canUpdate: (code: EAbilityCode) => boolean;
  canDelete: (code: EAbilityCode) => boolean;
}
