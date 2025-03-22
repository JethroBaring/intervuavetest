import { Prisma } from '@prisma/client';

export class CreateUserDto {
  id?: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  role?: UserRole;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
  company?: Prisma.CompanyCreateNestedOneWithoutOwnerInput;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
}
