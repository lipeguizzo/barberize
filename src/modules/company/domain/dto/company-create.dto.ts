import { AddressCreateDto } from '@/shared/domain/dto/address-create.dto';
import { EStatus } from '@/shared/domain/enums/status.enum';

export interface CompanyCreateDto {
  name: string;
  tradeName: string;
  email: string;
  status: EStatus;
  address: AddressCreateDto;
}
