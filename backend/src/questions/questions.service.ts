import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger(QuestionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      return await this.prisma.question.create({
        data: createQuestionDto,
      });
    } catch (error) {
      this.logger.error('Failed to create question', error);
      throw new InternalServerErrorException('Failed to create question');
    }
  }

  async findAll() {
    try {
      return await this.prisma.question.findMany({
        include: {
          coreValue: true,
          position: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch questions', error);
      throw new InternalServerErrorException('Failed to fetch questions');
    }
  }

  async findOne(id: string) {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id },
        include: {
          coreValue: true,
          position: true,
        },
      });

      if (!question) throw new NotFoundException('Question not found');
      return question;
    } catch (error) {
      this.logger.error(`Failed to fetch question with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      return await this.prisma.question.update({
        where: { id },
        data: updateQuestionDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update question with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update question');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.question.delete({ where: { id } });
      return { message: `Question ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove question with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove question');
    }
  }
}
