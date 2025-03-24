import { Prisma } from '@prisma/client';
export class CreateCompanyDto {
  id?: string;
  name: string;
  mission?: string | null;
  vision?: string | null;
  culture?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  owner: Prisma.UserCreateNestedOneWithoutCompanyInput;
  coreValues?: Prisma.CoreValueCreateNestedManyWithoutCompanyInput;
  positions?: Prisma.PositionCreateNestedManyWithoutCompanyInput;
  interviewTemplates?: Prisma.InterviewTemplateCreateNestedManyWithoutCompanyInput;
}
