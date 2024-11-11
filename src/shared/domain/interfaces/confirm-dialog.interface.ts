import { ReactNode } from 'react';

export interface IConfirmDialog {
  open?: boolean;
  title: string;
  description: string | ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  confirm?: () => void;
  cancel?: () => void;
}
