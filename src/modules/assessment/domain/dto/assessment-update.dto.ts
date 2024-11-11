export interface AssessmentUpdateDto {
  score: number;
  commentary?: string;
  companyId: number;
  barberId: number;
  clientId: number;
}
