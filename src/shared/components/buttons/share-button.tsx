import { Button, ButtonProps, Tooltip } from '@mui/material';
import Share from '@mui/icons-material/Share';
import { toast } from 'react-toastify';

interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
  companyName: string;
}

export function ShareButton({
  tooltip = '',
  companyName = '',
  ...props
}: Props) {
  async function handleShare(): Promise<void> {
    try {
      const url: string = `${import.meta.env.VITE_BASE_URL}/agendamento?companyName=${companyName}`;
      navigator.clipboard.writeText(url);
      toast.success('Link copiado!');
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          variant="text"
          color="warning"
          onClick={() => handleShare()}
          {...props}
        >
          <Share sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
