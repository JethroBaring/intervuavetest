import { Prisma } from '@prisma/client';
export class CreateCandidateDto {
  id?: string;
  fullName: string;
  email: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  interviews?: Prisma.InterviewCreateNestedManyWithoutCandidateInput;
}
