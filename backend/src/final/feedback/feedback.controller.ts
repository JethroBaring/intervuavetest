import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller({ path: 'evaluations/:evaluationId/feedback', version: '1' })
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Post() create(@Param('evaluationId') id: string, @Body() dto: CreateFeedbackDto) {
    return this.service.create(id, dto);
  }

  @Get() findOne(@Param('evaluationId') id: string) {
    return this.service.findOne(id);
  }
}
