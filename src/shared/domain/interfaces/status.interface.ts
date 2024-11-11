export interface IStatus {
  label: string;
  color:
    | 'default'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'primary'
    | 'secondary';
}
