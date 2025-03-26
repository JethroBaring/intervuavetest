import { Prisma } from '@prisma/client';

export class UpdateTemplateDto {
  name?: string;
  updatedAt?: Date | string;

  questions?: {
    deleteMany?: Prisma.QuestionWhereInput[];
    create?: Prisma.QuestionCreateWithoutTemplateInput[];
  };

  metrics?: {
    deleteMany?: Prisma.MetricWhereInput[];
    create?: Prisma.MetricCreateWithoutInterviewTemplateInput[];
  };

  positions?: {
    deleteMany?: Prisma.RoleWhereInput[];
    create?: Prisma.RoleCreateWithoutInterviewTemplateInput[];
  };
}
