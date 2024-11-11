export class AddressCityEntity {
  id: number = 0;
  name: string = '';

  constructor(partial: Partial<{ id: number; nome: string }>) {
    Object.assign(this, {
      id: partial,
      name: partial.nome,
    });
  }
}
