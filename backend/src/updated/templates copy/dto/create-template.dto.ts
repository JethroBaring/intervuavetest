import { Prisma } from '@prisma/client';
export class CreateTemplateDto {
  id?: string;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  company: Prisma.CompanyCreateNestedOneWithoutInterviewTemplatesInput;
  questions?: Prisma.QuestionCreateNestedManyWithoutTemplateInput;
  metrics?: Prisma.MetricCreateNestedManyWithoutInterviewTemplateInput;
  positions?: Prisma.RoleCreateNestedManyWithoutInterviewTemplateInput;
}
