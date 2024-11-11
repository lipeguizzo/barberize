import { ReactNode } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOption {
  label: string;
  value: any;
  content?: ReactNode;
}
