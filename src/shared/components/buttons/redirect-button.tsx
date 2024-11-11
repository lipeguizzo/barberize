import { Button, ButtonProps, Tooltip } from '@mui/material';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';

interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
  companyName: string;
}

export function RedirectButton({
  tooltip = '',
  companyName = '',
  ...props
}: Props) {
  const navigate = useNavigate();

  async function handleRedirect(): Promise<void> {
    try {
      navigate(
        `${EAuthenticatedPath.HOME}/agendamento?companyName=${companyName}`,
      );
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleRedirect()}
          {...props}
        >
          <OpenInNew sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
