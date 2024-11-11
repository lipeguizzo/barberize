export class StoredFileEntity {
  id: number = 0;
  uuid: string = '';
  alt: string = '';
  originalName: string = '';
  storedName: string = '';
  relativePath: string = '';
  contentType: string = '';
  isPublic: boolean = false;
  checksum: string = '';
  createdAt: Date = new Date();

  constructor(partial: Partial<StoredFileEntity>) {
    Object.assign(this, {
      ...partial,
    });
  }
}
