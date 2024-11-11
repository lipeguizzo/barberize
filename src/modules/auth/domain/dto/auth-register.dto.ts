import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { AddressCreateDto } from '@/shared/domain/dto/address-create.dto';

export interface AuthRegisterDto {
  name: string;
  email: string;
  gender: EGender;
  phone: string;
  reference: ERoleReference;
  password: string;
  companyName?: string;
  companyTradeName?: string;
  companyEmail?: string;
  address?: AddressCreateDto;
}
