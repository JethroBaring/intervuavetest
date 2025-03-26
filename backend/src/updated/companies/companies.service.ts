import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCoreValueDto } from './dto/update-core-value.dto';
import { CreateCoreValueDto } from './dto/create-core-value.dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      this.logger.error('Failed to create company', error);
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  async findAll() {
    try {
      return await this.prisma.company.findMany({
        include: {
          coreValues: true,
          roles: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch companies', error);
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  async findOne(companyId: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
        include: {
          coreValues: true,
          roles: true,
          interviewTemplates: true,
        },
      });

      if (!company) throw new NotFoundException('Company not found');
      return company;
    } catch (error) {
      this.logger.error(`Failed to fetch company with id: ${companyId}`, error);
      throw error;
    }
  }

  async update(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id: companyId },
        data: updateCompanyDto,
      });
    } catch (error) {
      this.logger.error(
        `Failed to update company with id: ${companyId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  async remove(companyId: string) {
    try {
      await this.prisma.company.delete({
        where: { id: companyId },
      });

      return { message: `Company ${companyId} removed successfully.` };
    } catch (error) {
      this.logger.error(
        `Failed to remove company with id: ${companyId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove company');
    }
  }

  async createCoreValues(
    companyId: string,
    createCoreValueDto: CreateCoreValueDto,
  ) {
    try {
      return await this.prisma.coreValue.create({
        data: createCoreValueDto,
      });
    } catch (error) {
      this.logger.error(
        `Failed to remove company with id: ${companyId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove company');
    }
  }

  async getCoreValues(companyId: string) {
    try {
      return await this.prisma.coreValue.findMany({
        where: {
          companyId,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to remove company with id: ${companyId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove company');
    }
  }

  async updateCoreValue(
    companyId: string,
    valueId: string,
    updateCoreValueDto: UpdateCoreValueDto,
  ) {
    try {
      return await this.prisma.coreValue.update({
        where: { id: valueId, companyId },
        data: updateCoreValueDto,
      });
    } catch (error) {
      this.logger.error(
        `Failed to update company with id: ${companyId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  async removeCoreValue(companyId: string, valueId: string) {
    try {
      await this.prisma.coreValue.delete({
        where: { id: valueId, companyId },
      });

      return { message: `Company ${valueId} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove company with id: ${valueId}`, error);
      throw new InternalServerErrorException('Failed to remove company');
    }
  }
}
