import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateFeedbackDto) {
    try {
      return await this.prisma.feedback.create({
        data: createDto,
      });
    } catch (error) {
      this.logger.error('Failed to create feedback', error);
      throw new InternalServerErrorException('Failed to create feedback');
    }
  }

  async findAll() {
    try {
      return await this.prisma.feedback.findMany();
    } catch (error) {
      this.logger.error('Failed to get feedback', error);
      throw new InternalServerErrorException('Failed to get feedback');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.feedback.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to get feedback', error);
      throw new InternalServerErrorException('Failed to get feedback');
    }
  }

  async update(id: string, updateDto: UpdateFeedbackDto) {
    try {
      return await this.prisma.feedback.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      this.logger.error('Failed to update feedback', error);
      throw new InternalServerErrorException('Failed to update feedback');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.feedback.delete({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to delete feedback', error);
      throw new InternalServerErrorException('Failed to delete feedback');
    }
  }
}
