import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  private readonly logger = new Logger(PositionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPositionDto: CreatePositionDto) {
    try {
      return await this.prisma.position.create({
        data: createPositionDto,
      });
    } catch (error) {
      this.logger.error('Failed to create position', error);
      throw new InternalServerErrorException('Failed to create position');
    }
  }

  async findAll() {
    try {
      return await this.prisma.position.findMany({
        include: {
          company: true,
          interviews: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch positions', error);
      throw new InternalServerErrorException('Failed to fetch positions');
    }
  }

  async findOne(id: string) {
    try {
      const position = await this.prisma.position.findUnique({
        where: { id },
        include: {
          company: true,
          interviews: true,
        },
      });

      if (!position) throw new NotFoundException('Position not found');
      return position;
    } catch (error) {
      this.logger.error(`Failed to fetch position with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    try {
      return await this.prisma.position.update({
        where: { id },
        data: updatePositionDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update position with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update position');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.position.delete({
        where: { id },
      });

      return { message: `Position ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove position with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove position');
    }
  }
}
