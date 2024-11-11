export interface IAssessmentDialog {
  companyId?: number;
  open?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  confirm?: () => void;
  cancel?: () => void;
}
