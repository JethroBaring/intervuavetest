import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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
          positions: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch companies', error);
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id },
        include: {
          coreValues: true,
          positions: true,
        },
      });

      if (!company) throw new NotFoundException('Company not found');
      return company;
    } catch (error) {
      this.logger.error(`Failed to fetch company with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update company with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.company.delete({
        where: { id },
      });

      return { message: `Company ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove company with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove company');
    }
  }
}
