import { useContext } from 'react';
import { ConfirmDialogContext } from '../contexts/confirm-dialog';

export function useConfirmDialog() {
  return useContext(ConfirmDialogContext);
}
