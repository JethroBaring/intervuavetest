import { Prisma } from '@prisma/client';
export class CreateResponseDto {
  id?: string;
  transcriptWeb: string;
  transcriptWhisper: string;
  finalTranscript: string;
  startTime: number;
  endTime: number;
  videoChunkUrl: string;
  emotion: string;
  tone: string;
  eyeGaze: string;
  posture: string;
  metrics: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  interview: Prisma.InterviewCreateNestedOneWithoutResponsesInput;
  question: Prisma.QuestionCreateNestedOneWithoutResponsesInput;
}
