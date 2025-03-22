import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createMetricDto: CreateMetricDto) {
    try {
      return await this.prisma.responseMetric.create({
        data: createMetricDto,
      });
    } catch (error) {
      this.logger.error('Failed to create metric', error);
      throw new InternalServerErrorException('Failed to create metric');
    }
  }

  async findAll(templateId: string) {
    try {
      return await this.prisma.responseMetric.findMany({
        where: { interviewTemplateId: templateId },
      });
    } catch (error) {
      this.logger.error('Failed to fetch metrics', error);
      throw new InternalServerErrorException('Failed to fetch metrics');
    }
  }

  async findOne(id: string) {
    try {
      const metric = await this.prisma.responseMetric.findUnique({
        where: { id },
      });

      if (!metric) throw new NotFoundException('Metric not found');
      return metric;
    } catch (error) {
      this.logger.error(`Failed to fetch metric with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch metric');
    }
  }

  async update(id: string, updateMetricDto: UpdateMetricDto) {
    try {
      return await this.prisma.responseMetric.update({
        where: { id },
        data: updateMetricDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update metric with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update metric');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.responseMetric.delete({
        where: { id },
      });

      return { message: `Metric ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove metric with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove metric');
    }
  }
}
