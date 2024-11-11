export interface AssessmentCreateDto {
  score: number;
  commentary?: string;
  companyId: number;
  barberId: number;
  clientId: number;
}
