import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewsDto } from './dto/create-interviews.dto';
import { UpdateInterviewsDto } from './dto/update-interviews.dto';

@Controller({ path: 'candidates/:candidateId/interviews', version: '1' })
export class InterviewsController {
  constructor(private readonly service: InterviewsService) {}

  @Post() create(
    @Param('candidateId') candidateId: string,
    @Body() dto: CreateInterviewsDto,
  ) {
    return this.service.create(candidateId, dto);
  }

  @Get() findAll(@Param('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Get(':interviewId') findOne(@Param('interviewId') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':interviewId') update(
    @Param('interviewId') id: string,
    @Body() dto: UpdateInterviewsDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':interviewId') remove(@Param('interviewId') id: string) {
    return this.service.remove(id);
  }
}
