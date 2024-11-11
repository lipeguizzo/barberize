/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { IConfirmDialog } from '../domain/interfaces/confirm-dialog.interface';
import { IConfirmDialogContextType } from '../domain/interfaces/confirm-dialog-context-type.interface';

export const ConfirmDialogContext = createContext<IConfirmDialogContextType>(
  {} as IConfirmDialogContextType,
);

export const ConfirmDialogProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<IConfirmDialog>({
    open: false,
    title: '',
    description: '',
  });

  function openDialog(params: IConfirmDialog): Promise<boolean> {
    const value: IConfirmDialog = {
      ...params,
      open: true,
    };

    setState(value);

    return new Promise((resolve, reject) => {
      setState((prev) => ({
        ...prev,
        confirm: () => {
          resolve(true);
          confirmDialog(state);
        },
        cancel: () => {
          reject(false);
          cancelDialog(state);
        },
      }));
    });
  }

  function closeDialog() {
    setState((prev) => ({
      ...prev,
      open: false,
    }));
  }

  function confirmDialog(params: IConfirmDialog) {
    const value: IConfirmDialog = {
      ...params,
      open: false,
    };

    if (value.confirm) value.confirm();

    setState(value);
  }

  function cancelDialog(params: IConfirmDialog) {
    const value: IConfirmDialog = {
      ...params,
      open: false,
    };

    if (value.cancel) value.cancel();

    setState(value);
  }

  const value = useMemo(
    () => ({
      openDialog,
      closeDialog,
      state,
    }),
    [openDialog, state],
  );

  const { open, title, description, confirmLabel, cancelLabel } = state;

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      <Dialog open={open ?? false} onClose={cancelDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{description}</DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => cancelDialog(state)} color="error">
            {cancelLabel ?? 'Cancelar'}
          </Button>
          <Button onClick={() => confirmDialog(state)} color="success">
            {confirmLabel ?? 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
};
