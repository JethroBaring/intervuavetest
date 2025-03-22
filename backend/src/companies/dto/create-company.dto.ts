import { Prisma } from '@prisma/client';
export class CreateCompanyDto {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  culture: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  owner: Prisma.UserCreateNestedOneWithoutCompanyInput;
  coreValues?: Prisma.CoreValueCreateNestedManyWithoutCompanyInput;
  positions?: Prisma.PositionCreateNestedManyWithoutCompanyInput;
  responseMetrics?: Prisma.ResponseMetricCreateNestedManyWithoutCompanyInput;
}
