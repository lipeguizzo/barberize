import { Button, ButtonProps, Tooltip } from '@mui/material';
import Star from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import { useAssessmentDialog } from '@/shared/hooks/use-assessment-dialog';

interface Props extends Omit<ButtonProps, 'component'> {
  tooltip: string;
  companyId: number;
}

export function AssessmentButton({ tooltip = '', companyId, ...props }: Props) {
  const { openDialog } = useAssessmentDialog();

  async function handleAssessment(): Promise<void> {
    try {
      await openDialog({
        companyId: companyId,
      });
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
          onClick={handleAssessment}
          {...props}
        >
          <Star sx={{ fontSize: '30px' }} />
        </Button>
      </span>
    </Tooltip>
  );
}
