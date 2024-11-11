import { FieldErrors, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatErrorForNotification(error: any): string {
  if (!error) return 'Erro desconhecido!';

  if (typeof error === 'string') {
    return error;
  }

  if (error.response && error.response.data && error.response.data.message) {
    return Array.isArray(error.response.data.message)
      ? error.response.data.message.map((message: string) => message).join(', ')
      : error.response.data.message;
  }

  if (
    error.response &&
    error.response.data &&
    Array.isArray(error.response.data.errors)
  ) {
    return error.response.data.errors
      .map((item: any) => item.message)
      .join(', ');
  }

  if (error.message) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado!';
}

export function callbackOnInvalidZod(error: unknown) {
  if (import.meta.env.DEV) console.warn('ZOD Error: ', error);
}

export function handleZodInvalidSchema<T extends FieldValues>(
  errors: FieldErrors<T>,
) {
  callbackOnInvalidZod(errors);
  Object.values(errors).map((prop) => {
    if (prop) {
      if (prop.message && !prop.ref) toast.error(prop.message.toString());
      if (Array.isArray(prop)) prop.map(handleZodInvalidSchema);
    }
  });
}
