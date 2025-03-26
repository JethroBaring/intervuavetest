import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationsService {
  private readonly logger = new Logger(EvaluationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    try {
      return await this.prisma.evaluation.create({
        data: createEvaluationDto,
      });
    } catch (error) {
      this.logger.error('Failed to create evaluation', error);
      throw new InternalServerErrorException('Failed to create evaluation');
    }
  }

  async findAll() {
    try {
      return await this.prisma.evaluation.findMany({
        include: {
          interview: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch evaluations', error);
      throw new InternalServerErrorException('Failed to fetch evaluations');
    }
  }

  async findOne(id: string) {
    try {
      const evaluation = await this.prisma.evaluation.findUnique({
        where: { id },
        include: {
          interview: true,
        },
      });

      if (!evaluation) throw new NotFoundException('Evaluation not found');
      return evaluation;
    } catch (error) {
      this.logger.error(`Failed to fetch evaluation with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateEvaluationDto: UpdateEvaluationDto) {
    try {
      return await this.prisma.evaluation.update({
        where: { id },
        data: updateEvaluationDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update evaluation with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update evaluation');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.evaluation.delete({
        where: { id },
      });

      return { message: `Evaluation ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove evaluation with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove evaluation');
    }
  }
}
