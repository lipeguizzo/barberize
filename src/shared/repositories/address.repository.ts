import { AddressCityEntity } from '../domain/entities/address-city.entity';
import { ID } from '../types/id';
import { AddressStateEntity } from './../domain/entities/address-state.entity';
import axios, { AxiosInstance } from 'axios';

export class AddressRepository {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://servicodados.ibge.gov.br/api/v1/',
      timeout: 900000,
      timeoutErrorMessage: 'Tempo limite, Tente novamente mais tarde.',
    });
  }

  public isOK(status: number): boolean {
    return status >= 200 && status < 300;
  }

  public async findStates(): Promise<AddressStateEntity[]> {
    const { status, data } = await this.http.get<AddressStateEntity[]>(
      `localidades/estados?orderBy=nome`,
    );

    if (this.isOK(status))
      return (
        data.map(
          (address: Partial<AddressStateEntity>) =>
            new AddressStateEntity(address),
        ) ?? []
      );

    throw new Error('Aconteceu um erro!');
  }

  public async findCity(uf: ID): Promise<AddressCityEntity[]> {
    const { status, data } = await this.http.get<AddressCityEntity[]>(
      `localidades/estados/${uf}/municipios`,
    );

    if (this.isOK(status))
      return (
        data.map(
          (address: Partial<AddressCityEntity>) =>
            new AddressCityEntity(address),
        ) ?? []
      );

    throw new Error('Aconteceu um erro!');
  }
}
