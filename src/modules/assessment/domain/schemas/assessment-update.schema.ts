import { z } from 'zod';

export const AssessmentUpdateSchema = z.object({
  score: z.coerce.number({ message: 'Campo obrigatório!' }),
  commentary: z.string().optional(),
  barberId: z.coerce.number({ message: 'Campo obrigatório!' }),
});

export type AssessmentUpdateData = z.infer<typeof AssessmentUpdateSchema>;
