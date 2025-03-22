import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createResponseDto: CreateResponseDto) {
    try {
      return await this.prisma.response.create({
        data: createResponseDto,
      });
    } catch (error) {
      this.logger.error('Failed to create response', error);
      throw new InternalServerErrorException('Failed to create response');
    }
  }

  async findAll() {
    try {
      return await this.prisma.response.findMany({
        include: {
          interview: true,
          question: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch responses', error);
      throw new InternalServerErrorException('Failed to fetch responses');
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.prisma.response.findUnique({
        where: { id },
        include: {
          interview: true,
          question: true,
        },
      });

      if (!response) throw new NotFoundException('Response not found');
      return response;
    } catch (error) {
      this.logger.error(`Failed to fetch response with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch response');
    }
  }

  async update(id: string, updateResponseDto: UpdateResponseDto) {
    try {
      return await this.prisma.response.update({
        where: { id },
        data: updateResponseDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update response with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update response');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.response.delete({
        where: { id },
      });

      return { message: `Response ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove response with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove response');
    }
  }
}
