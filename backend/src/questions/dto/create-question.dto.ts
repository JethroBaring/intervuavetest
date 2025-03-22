import { Prisma } from '@prisma/client';
export class CreateQuestionDto {
  id?: string;
  questionText: string;
  inspiredBy: InspiredBy;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  position: Prisma.PositionCreateNestedOneWithoutQuestionsInput;
  coreValue: Prisma.CoreValueCreateNestedOneWithoutQuestionsInput;
  responses?: Prisma.ResponseCreateNestedManyWithoutQuestionInput;
}

export enum InspiredBy {
  MISSION = 'MISSION',
  VISION = 'VISION',
  CULTURE = 'CULTURE',
}
