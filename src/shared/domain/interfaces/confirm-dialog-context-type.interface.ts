import { IConfirmDialog } from './confirm-dialog.interface';

export interface IConfirmDialogContextType {
  openDialog: (params: IConfirmDialog) => Promise<boolean>;
  closeDialog: () => void;
  state: IConfirmDialog;
}
