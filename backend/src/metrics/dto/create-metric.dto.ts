import { Prisma } from '@prisma/client';
export class CreateMetricDto {
  id?: string;
  name: string;
  description: string;
  weight?: number;
  interviewTemplate: Prisma.InterviewTemplateCreateNestedOneWithoutMetricsInput;
}
