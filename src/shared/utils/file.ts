import { Client } from '@/infra/http/client';

export function createFileURL(file: File | Blob): string {
  return URL.createObjectURL(file);
}

export function createFileFromUUID(uuid: string, isPublic: boolean = true) {
  const baseApiUrl = import.meta.env.VITE_BASE_URL_API;
  const url = isPublic
    ? `${baseApiUrl}/files/public/${uuid}`
    : `${baseApiUrl}/files/${uuid}`;

  return createFileFromURL(url);
}

export async function createFileFromURL(url: string): Promise<File> {
  const response = await Client(url, { responseType: 'arraybuffer' });

  const buff = await response.data;

  const contentType = response.headers['content-type'] as string;

  const disposition = (response.headers['content-disposition'] as string) ?? '';

  const name =
    disposition
      ?.split(';')
      .map((attr) => attr.trim())
      .find((attr) => attr.startsWith('filename='))
      ?.split('=')[1]
      ?.replace(/"/g, '') || 'unknown';

  return new File([buff], name, { type: contentType });
}
