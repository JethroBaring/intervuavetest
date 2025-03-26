import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCompanyDto } from './dto/create-companies.dto';
import { UpdateCompanyDto } from './dto/update-companies.dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: createDto,
      });
    } catch (error) {
      this.logger.error('Failed to create companies', error);
      throw new InternalServerErrorException('Failed to create companies');
    }
  }

  async findAll() {
    try {
      return await this.prisma.company.findMany();
    } catch (error) {
      this.logger.error('Failed to get companies', error);
      throw new InternalServerErrorException('Failed to get companies');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.company.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to get companies', error);
      throw new InternalServerErrorException('Failed to get companies');
    }
  }

  async update(id: string, updateDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      this.logger.error('Failed to update companies', error);
      throw new InternalServerErrorException('Failed to update companies');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.company.delete({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to delete companies', error);
      throw new InternalServerErrorException('Failed to delete companies');
    }
  }
}
