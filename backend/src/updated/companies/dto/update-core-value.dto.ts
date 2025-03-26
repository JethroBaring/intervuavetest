import { CreateCoreValueDto } from './create-core-value.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCoreValueDto extends PartialType(CreateCoreValueDto) {}
