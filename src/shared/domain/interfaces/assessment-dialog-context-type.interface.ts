import { IAssessmentDialog } from './assessment-dialog.interface';

export interface IAssessmentDialogContextType {
  openDialog: (params: IAssessmentDialog) => Promise<boolean>;
  closeDialog: () => void;
  state: IAssessmentDialog;
}
