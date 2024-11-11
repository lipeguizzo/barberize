import { IStepperStep } from '@/shared/domain/interfaces/stepper-step.interface';
import { Box, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';

interface Props {
  active: number;
  steps: Array<IStepperStep>;
}

export function Stepper({ active, steps }: Props) {
  const activeStep = steps.length > 0 && steps[active].content;

  return (
    <>
      <MuiStepper variant="outlined" activeStep={active}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>

      <Box sx={{ width: '100%' }}>{activeStep}</Box>
    </>
  );
}
