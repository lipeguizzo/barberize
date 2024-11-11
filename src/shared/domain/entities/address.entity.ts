export class AddressEntity {
  id: number = 0;
  state: string = '';
  city: string = '';
  street: string = '';
  neighborhood: string = '';
  complement: string = '';

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, { ...partial });
  }
}
