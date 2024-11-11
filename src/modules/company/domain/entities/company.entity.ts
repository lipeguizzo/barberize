import { AddressEntity } from '@/shared/domain/entities/address.entity';
import { StoredFileEntity } from '@/shared/domain/entities/stored-file.entity';
import { EStatus } from '@/shared/domain/enums/status.enum';

export class CompanyEntity {
  id: number = 0;
  name: string = '';
  tradeName?: string = '';
  email: string = '';
  status: EStatus = EStatus.ACTIVE;
  address?: AddressEntity;
  avatarId?: number = 0;
  avatar?: StoredFileEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: Partial<CompanyEntity>) {
    const address = partial.address && new AddressEntity(partial.address);
    const avatar = partial.avatar && new StoredFileEntity(partial.avatar);
    Object.assign(this, {
      address,
      avatar,
      ...partial,
    });
  }
}
