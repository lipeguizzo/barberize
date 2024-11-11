import { IPaginationMetadata } from './pagination-metadata.interface';

export interface IPaginationResponse<T> {
  data: T[];
  _meta: IPaginationMetadata;
}
