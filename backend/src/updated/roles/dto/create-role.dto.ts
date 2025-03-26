import { Prisma } from '@prisma/client';

export class CreateRoleDto {
  id?: string;
  title: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  company: Prisma.CompanyCreateNestedOneWithoutRolesInput;
  interviews?: Prisma.InterviewCreateNestedManyWithoutRoleInput;
  interviewTemplate: Prisma.InterviewTemplateCreateNestedOneWithoutRolesInput;
}
