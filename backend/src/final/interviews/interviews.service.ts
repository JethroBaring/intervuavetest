import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateInterviewsDto } from './dto/create-interviews.dto';
import { UpdateInterviewsDto } from './dto/update-interviews.dto';

@Injectable()
export class InterviewsService {
  private readonly logger = new Logger(InterviewsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(candidateId: string, createDto: CreateInterviewsDto) {
    return this.prisma.interview.create({
      data: {
        ...createDto,
        candidateId, // ✅ include in data
        interviewLink: '',
      },
    });
  }

  async findAll(companyId: string) {
    try {
      return await this.prisma.interview.findMany({
        where: {
          candidate: {
            companyId,
          },
        },
        include: {
          candidate: true,
          role: {
            include: {
              interviewTemplate: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Failed to get interviews for company', error);
      throw new InternalServerErrorException('Failed to get interviews');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.interview.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to get interviews', error);
      throw new InternalServerErrorException('Failed to get interviews');
    }
  }

  async update(id: string, updateDto: UpdateInterviewsDto) {
    try {
      return await this.prisma.interview.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      this.logger.error('Failed to update interviews', error);
      throw new InternalServerErrorException('Failed to update interviews');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.interview.delete({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to delete interviews', error);
      throw new InternalServerErrorException('Failed to delete interviews');
    }
  }
}
