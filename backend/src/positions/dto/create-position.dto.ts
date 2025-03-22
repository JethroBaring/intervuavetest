import { Prisma } from '@prisma/client';

export class CreatePositionDto {
  id?: string;
  title: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  company: Prisma.CompanyCreateNestedOneWithoutPositionsInput;
  questions?: Prisma.QuestionCreateNestedManyWithoutPositionInput;
  interviews?: Prisma.InterviewCreateNestedManyWithoutPositionInput;
}
