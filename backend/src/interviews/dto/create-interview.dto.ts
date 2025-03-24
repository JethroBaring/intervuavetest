import { Prisma } from '@prisma/client';
export class CreateInterviewDto {
  id?: string;
  interviewLink: string;
  expiresAt: Date | string;
  videoUrl: string;
  cameraType: InputType;
  micType: InputType;
  noiseLevel?: number | null;
  deviceType: DeviceType;
  status?: InterviewStatus;
  aiDecision?: Decision | null;
  finalDecision?: Decision | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  candidate: Prisma.CandidateCreateNestedOneWithoutInterviewsInput;
  position: Prisma.PositionCreateNestedOneWithoutInterviewsInput;
  responses?: Prisma.ResponseCreateNestedManyWithoutInterviewInput;
  evaluation?: Prisma.EvaluationCreateNestedOneWithoutInterviewInput;
}

export enum InputType {
  BUILT_IN = 'BUILT_IN',
  EXTERNAL = 'EXTERNAL',
}

export enum DeviceType {
  DESKTOP = 'DESKTOP',
  LAPTOP = 'LAPTOP',
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
}

export enum InterviewStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PROCESSING = 'PROCESSING',
  EVALUATED = 'EVALUATED',
  EXPIRED = 'EXPIRED',
}

export enum Decision {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
