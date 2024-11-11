import { Button, ButtonProps, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
}

export function DeleteButton({ tooltip = '', ...props }: Props) {
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button variant="text" color="error" {...props}>
          <Delete sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
