import { useContext } from 'react';
import { AssessmentDialogContext } from '../contexts/assessment-dialog';

export function useAssessmentDialog() {
  return useContext(AssessmentDialogContext);
}
