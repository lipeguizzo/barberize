import { z } from 'zod';

export const AssessmentCreateSchema = z.object({
  score: z.coerce.number({ message: 'Campo obrigatório!' }),
  commentary: z.string().optional(),
  barberId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type AssessmentCreateData = z.infer<typeof AssessmentCreateSchema>;
