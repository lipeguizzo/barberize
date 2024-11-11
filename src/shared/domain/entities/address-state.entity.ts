export class AddressStateEntity {
  id: number = 0;
  acronym: string = '';
  name: string = '';

  constructor(partial: Partial<{ id: number; sigla: string; nome: string }>) {
    Object.assign(this, {
      id: partial.id,
      acronym: partial.sigla,
      name: partial.nome,
    });
  }
}
