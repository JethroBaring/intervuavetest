import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  private readonly logger = new Logger(PositionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: createRoleDto,
      });
    } catch (error) {
      this.logger.error('Failed to create position', error);
      throw new InternalServerErrorException('Failed to create position');
    }
  }

  async findAll() {
    try {
      return await this.prisma.role.findMany({
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
      const role = await this.prisma.role.findUnique({
        where: { id },
        include: {
          company: true,
          interviews: true,
        },
      });

      if (!role) throw new NotFoundException('Role not found');
      return role;
    } catch (error) {
      this.logger.error(`Failed to fetch role with id: ${id}`, error);
      throw error;
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update position with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to update position');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.role.delete({
        where: { id },
      });

      return { message: `Position ${id} removed successfully.` };
    } catch (error) {
      this.logger.error(`Failed to remove position with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to remove position');
    }
  }
}
