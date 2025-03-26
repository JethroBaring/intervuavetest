import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createTemplateDto: CreateTemplateDto) {
    try {
      return await this.prisma.interviewTemplate.create({
        data: createTemplateDto,
        include: {
          questions: true,
          metrics: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create interview template', error);
      throw new InternalServerErrorException(
        'Failed to create interview template',
      );
    }
  }

  async findAll(id: string) {
    try {
      return await this.prisma.interviewTemplate.findMany({
        include: {
          questions: true,
          metrics: true,
          roles: true,
        },
        where: {
          companyId: id,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch interview templates', error);
      throw new InternalServerErrorException('Failed to fetch templates');
    }
  }

  async findOne(id: string) {
    try {
      const template = await this.prisma.interviewTemplate.findUnique({
        where: { id },
        include: {
          company: true,
          questions: true,
          metrics: true,
          roles: true,
        },
      });

      if (!template) throw new NotFoundException('Template not found');
      return template;
    } catch (error) {
      this.logger.error(`Failed to fetch template with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch template');
    }
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    try {
      return await this.prisma.interviewTemplate.update({
        where: { id },
        data: {
          name: updateTemplateDto.name,
          updatedAt: new Date(),
          questions: {
            deleteMany: {},
            create: updateTemplateDto.questions?.create || [],
          },
          metrics: {
            deleteMany: {},
            create: updateTemplateDto.metrics?.create || [],
          },
          roles: {
            deleteMany: {},
            create: updateTemplateDto.positions?.create || [],
          },
        },
        include: {
          company: true,
          questions: true,
          metrics: true,
          roles: true,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update template with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update template');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.interviewTemplate.delete({
        where: { id },
      });

      return { message: `Template ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove template with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove template');
    }
  }
}
