import { AbilityEntity } from '../domain/entities/ability.entity';

export function groupAbilitiesByCode(
  abilities: AbilityEntity[],
): Record<string, AbilityEntity[]> {
  return abilities.reduce(
    (acc, ability) => {
      if (!acc[ability.code]) {
        acc[ability.code] = [];
      }
      acc[ability.code].push(ability);
      return acc;
    },
    {} as Record<string, AbilityEntity[]>,
  );
}
