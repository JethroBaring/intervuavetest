import { Prisma } from '@prisma/client';
export class CreateCoreValueDto {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  company: Prisma.CompanyCreateNestedOneWithoutCoreValuesInput;
  questions?: Prisma.QuestionCreateNestedManyWithoutCoreValueInput;
}
