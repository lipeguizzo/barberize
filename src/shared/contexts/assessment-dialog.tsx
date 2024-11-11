/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { IAssessmentDialogContextType } from '../domain/interfaces/assessment-dialog-context-type.interface';
import { IAssessmentDialog } from '../domain/interfaces/assessment-dialog.interface';
import {
  AssessmentCreateData,
  AssessmentCreateSchema,
} from '@/modules/assessment/domain/schemas/assessment-create.schema';
import { AssessmentCreateDto } from '@/modules/assessment/domain/dto/assessment-create.dto';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { AssessmentRepository } from '@/modules/assessment/repositories/assessment.repository';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formatErrorForNotification,
  handleZodInvalidSchema,
} from '../utils/error';
import { ControlledRating } from '../components/inputs/controlled-rating';
import { ControlledText } from '../components/inputs/controlled-text';
import { ControlledBarber } from '../components/inputs/controlled-barber';

export const AssessmentDialogContext =
  createContext<IAssessmentDialogContextType>(
    {} as IAssessmentDialogContextType,
  );

export const AssessmentDialogProvider = ({ children }: PropsWithChildren) => {
  const assessmentRepository = new AssessmentRepository();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<IAssessmentDialog>({
    open: false,
  });

  const { control, handleSubmit, reset, formState } =
    useForm<AssessmentCreateData>({
      defaultValues: {
        score: 0,
        commentary: '',
      },
      resolver: zodResolver(AssessmentCreateSchema),
    });

  async function submit(data: AssessmentCreateData) {
    if (loading) return;
    try {
      setLoading(true);
      const dto: AssessmentCreateDto = {
        companyId: Number(state.companyId),
        clientId: Number(user?.id),
        ...data,
      };
      await assessmentRepository.create(dto);
      toast.success('Avaliado com sucesso!');
      reset();
      confirmDialog(state);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  function openDialog(params: IAssessmentDialog): Promise<boolean> {
    const value: IAssessmentDialog = {
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
    reset();
    setState((prev) => ({
      ...prev,
      open: false,
    }));
  }

  function confirmDialog(params: IAssessmentDialog) {
    const value: IAssessmentDialog = {
      ...params,
      open: false,
    };

    if (value.confirm) {
      value.confirm();
    }

    setState(value);
  }

  function cancelDialog(params: IAssessmentDialog) {
    const value: IAssessmentDialog = {
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

  const { open, confirmLabel, cancelLabel } = state;

  const isValid: boolean = formState.isValid;

  return (
    <AssessmentDialogContext.Provider value={value}>
      {children}
      <Dialog open={open ?? false} onClose={cancelDialog} fullWidth={true}>
        <DialogTitle>Avaliação</DialogTitle>
        <DialogContent>
          <Stack gap={3} width="100%">
            <DialogContentText>
              Escolha o barbeiro e uma nota.
            </DialogContentText>
            <ControlledBarber
              label="Selecionar barbeiro(a)"
              name="barberId"
              size="medium"
              variant="outlined"
              control={control}
              companyId={Number(state.companyId)}
            />

            <ControlledRating
              name="score"
              size="large"
              position="center"
              control={control}
            />

            <ControlledText
              label="Comentário (Opcional)"
              name="commentary"
              size="medium"
              control={control}
              variant="outlined"
              placeholder="Comentário (Opcional)"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => cancelDialog(state)} color="error">
            {cancelLabel ?? 'Cancelar'}
          </Button>
          <Button
            onClick={handleSubmit(submit, handleZodInvalidSchema)}
            color="success"
            disabled={!isValid}
          >
            {confirmLabel ?? 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </AssessmentDialogContext.Provider>
  );
};
