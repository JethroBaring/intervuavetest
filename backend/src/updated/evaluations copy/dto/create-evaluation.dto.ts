import { Prisma } from '@prisma/client';
export class CreateEvaluationDto {
  id?: string;
  valuesFit: number;
  responseQuality: number;
  missionAlignment: number;
  visionAlignment: number;
  cultureFit: number;
  overallFitScore: number;
  perQuestionResults: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  perValueBreakdown: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  interview: Prisma.InterviewCreateNestedOneWithoutEvaluationInput;
}
