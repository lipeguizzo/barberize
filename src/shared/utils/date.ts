export function formatDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateEn(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function formatDayMonth(dayMonth: string): string {
  const date = new Date();
  const [day, month] = dayMonth.split('-');
  const year: number = date.getFullYear();

  return `${year}-${month}-${day}`;
}
