import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

@Injectable()
export class InterviewsService {
  private readonly logger = new Logger(InterviewsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createInterviewDto: CreateInterviewDto) {
    try {
      return await this.prisma.interview.create({
        data: createInterviewDto,
      });
    } catch (error) {
      this.logger.error('Failed to create interview', error);
      throw new InternalServerErrorException('Failed to create interview');
    }
  }

  async findAll() {
    try {
      return await this.prisma.interview.findMany({
        include: {
          candidate: true,
          position: true,
          responses: true,
          evaluation: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch interviews', error);
      throw new InternalServerErrorException('Failed to fetch interviews');
    }
  }

  async findOne(id: string) {
    try {
      const interview = await this.prisma.interview.findUnique({
        where: { id },
        include: {
          candidate: true,
          position: true,
          responses: true,
          evaluation: true,
        },
      });

      if (!interview) throw new NotFoundException('Interview not found');
      return interview;
    } catch (error) {
      this.logger.error(`Failed to fetch interview with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateInterviewDto: UpdateInterviewDto) {
    try {
      return await this.prisma.interview.update({
        where: { id },
        data: updateInterviewDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update interview with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update interview');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.interview.delete({
        where: { id },
      });

      return { message: `Interview ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove interview with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove interview');
    }
  }
}
