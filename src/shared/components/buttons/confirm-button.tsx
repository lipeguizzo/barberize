import { Button, ButtonProps, Tooltip } from '@mui/material';
import Done from '@mui/icons-material/Done';
interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
}

export function ConfirmButton({ tooltip = '', ...props }: Props) {
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button variant="text" color="success" {...props}>
          <Done sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
