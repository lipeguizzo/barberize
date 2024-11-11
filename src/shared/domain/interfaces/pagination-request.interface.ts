import { Sort } from '@/shared/types/sort';

export interface IPaginationRequest {
  page: number;
  pageSize: number;
  ordering?: Sort;
  orderBy?: string;
}
