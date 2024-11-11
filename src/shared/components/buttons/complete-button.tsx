import { Button, ButtonProps, Tooltip } from '@mui/material';
import DoneAll from '@mui/icons-material/DoneAll';
interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
}

export function CompleteButton({ tooltip = '', ...props }: Props) {
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button variant="text" color="success" {...props}>
          <DoneAll sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
