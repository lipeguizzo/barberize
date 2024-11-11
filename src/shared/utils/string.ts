export function isInEnum<T extends Record<string, string | number>>(
  value: string,
  enumData: T,
): boolean {
  return Object.values(enumData).includes(value);
}

export function formatLongString(
  value: string,
  maxLength: number = 25,
): string {
  return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
}

export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}
