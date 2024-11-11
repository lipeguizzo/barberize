import { Button, ButtonProps, Tooltip } from '@mui/material';
import WhatsApp from '@mui/icons-material/WhatsApp';

interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
  phone: string;
}

export function WhatsAppButton({ tooltip = '', phone = '', ...props }: Props) {
  async function handleContact(): Promise<void> {
    window.open(`https://wa.me/55${phone}?text=Olá`, '_blank');
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          variant="text"
          color="success"
          onClick={() => handleContact()}
          {...props}
        >
          <WhatsApp sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
