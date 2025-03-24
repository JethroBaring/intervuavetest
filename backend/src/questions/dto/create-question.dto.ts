import { Prisma } from '@prisma/client';
export class CreateQuestionDto {
  id?: string;
  questionText: string;
  alignedWith: AlignedWith;
  evaluates: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  template: Prisma.InterviewTemplateCreateNestedOneWithoutQuestionsInput;
  responses?: Prisma.ResponseCreateNestedManyWithoutQuestionInput;
}

export enum AlignedWith {
  MISSION = 'MISSION',
  VISION = 'VISION',
  CULTURE = 'CULTURE',
}
