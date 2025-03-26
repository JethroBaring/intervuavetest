import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidatesService {
  private readonly logger = new Logger(CandidatesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto) {
    try {
      return await this.prisma.candidate.create({
        data: createCandidateDto,
      });
    } catch (error) {
      this.logger.error('Failed to create candidate', error);
      throw new InternalServerErrorException('Failed to create candidate');
    }
  }

  async findAll() {
    try {
      return await this.prisma.candidate.findMany({
        include: {
          interviews: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch candidates', error);
      throw new InternalServerErrorException('Failed to fetch candidates');
    }
  }

  async findOne(id: string) {
    try {
      const candidate = await this.prisma.candidate.findUnique({
        where: { id },
        include: {
          interviews: true,
        },
      });

      if (!candidate) throw new NotFoundException('Candidate not found');
      return candidate;
    } catch (error) {
      this.logger.error(`Failed to fetch candidate with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto) {
    try {
      return await this.prisma.candidate.update({
        where: { id },
        data: updateCandidateDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update candidate with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update candidate');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.candidate.delete({
        where: { id },
      });

      return { message: `Candidate ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove candidate with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove candidate');
    }
  }
}
