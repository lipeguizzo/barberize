import { HoraryEntity } from '@/modules/horary/domain/entities/horary.entity';
import { HoraryRepository } from '@/modules/horary/repositories/horary.repository';
import { ControlledBarber } from '@/shared/components/inputs/controlled-barber';
import { ControlledDate } from '@/shared/components/inputs/controlled-date';
import { ControlledHaircut } from '@/shared/components/inputs/controlled-haircut';
import { ControlledHorary } from '@/shared/components/inputs/controlled-horary';
import { formatDate } from '@/shared/utils/date';
import { formatErrorForNotification } from '@/shared/utils/error';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Theme,
} from '@mui/material';
import { Box, Container, useMediaQuery } from '@mui/system';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

interface Props {
  companyId: number;
}

export function HomeSchedulingForm({ companyId }: Props) {
  const { control, watch, setValue } = useFormContext();

  const isMobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const horaryRepository = new HoraryRepository();

  const [horary, setHorary] = useState<HoraryEntity | null>(null);

  const date = watch('date');
  const barberId = watch('barberId');
  const haircutId = watch('haircutId');
  const horaryId = watch('horaryId');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue('date', new Date());
    setValue('horaryId', undefined);
    setHorary(null);
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const data = await horaryRepository.findOne(companyId);
      setHorary(data);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setOpen(false);
    }
  };

  return (
    <Container>
      <Box margin={3}>
        <ControlledBarber
          label="Selecionar barbeiro(a)"
          name="barberId"
          size="medium"
          variant="outlined"
          fullWidth={true}
          control={control}
          companyId={companyId}
        />
      </Box>
      <Box margin={3}>
        <ControlledHaircut
          label="Selecionar corte"
          name="haircutId"
          size="medium"
          variant="outlined"
          disabled={barberId === undefined}
          fullWidth={true}
          control={control}
          companyId={companyId}
        />
      </Box>
      <Box margin={3}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth={true}
          onClick={handleClickOpen}
          disabled={haircutId === undefined}
        >
          {horary
            ? `${horary.time} - ${formatDate(dayjs(date).toDate())}`
            : 'Selecionar data e hora'}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullScreen={isMobile}
          fullWidth={true}
        >
          <DialogTitle textAlign="center">
            Selecione uma data e um horário
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <ControlledDate
              control={control}
              companyId={companyId}
              barberId={barberId}
              name="date"
              label="Data do agendamento"
            />
            <ControlledHorary
              name="horaryId"
              control={control}
              companyId={companyId}
              barberId={barberId}
              date={date}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              onClick={handleConfirm}
              autoFocus
              disabled={horaryId === undefined}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
