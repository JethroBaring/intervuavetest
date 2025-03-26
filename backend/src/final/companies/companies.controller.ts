import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-companies.dto';
import { UpdateCompanyDto } from './dto/update-companies.dto';

@Controller({ path: 'companies', version: '1' })
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post() create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get() findAll() {
    return this.service.findAll();
  }

  @Get(':companyId') findOne(@Param('companyId') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':companyId') update(
    @Param('companyId') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':companyId') remove(@Param('companyId') id: string) {
    return this.service.remove(id);
  }
}
