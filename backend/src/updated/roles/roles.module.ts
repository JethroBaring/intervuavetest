import { Module } from '@nestjs/common';
import { PositionsService } from './roles.service';
import { PositionsController } from './roles.controller';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
