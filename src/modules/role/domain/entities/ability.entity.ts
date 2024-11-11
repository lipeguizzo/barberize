import { EAbilityAction } from '../enums/ability-action.enum';
import { EAbilityCode } from '../enums/ability-code.enum';

export class AbilityEntity {
  id: number = 0;
  code: EAbilityCode = EAbilityCode.USERS;
  action: EAbilityAction = EAbilityAction.READ;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: AbilityEntity) {
    Object.assign(this, {
      ...partial,
    });
  }
}
