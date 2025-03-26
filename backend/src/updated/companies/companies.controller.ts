import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCoreValueDto } from './dto/create-core-value.dto';
import { UpdateCoreValueDto } from './dto/update-core-value.dto';

@Controller({ path: 'companies', version: '1' })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':companyId')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('companyId') companyId: string) {
    return this.companiesService.findOne(companyId);
  }

  @Patch(':companyId')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('companyId') companyId: string) {
    return this.companiesService.remove(companyId);
  }

  @Post(':companyId/core-values/')
  @UseGuards(JwtAuthGuard)
  createCoreValue(
    @Param('companyId') companyId: string,
    @Param('valueId') valueId: string,
    @Body() createCoreValueDto: CreateCoreValueDto,
  ) {
    return this.companiesService.updateCoreValue(
      companyId,
      valueId,
      createCoreValueDto,
    );
  }

  @Get(':companyId/core-values')
  @UseGuards(JwtAuthGuard)
  getCoreValuues(@Param('companyId') companyId: string) {
    return this.companiesService.getCoreValues(companyId);
  }

  @Patch(':companyId/core-values/:valueId')
  @UseGuards(JwtAuthGuard)
  updateCoreValue(
    @Param('companyId') companyId: string,
    @Param('valueId') valueId: string,
    @Body() updateCoreValueDto: UpdateCoreValueDto,
  ) {
    return this.companiesService.updateCoreValue(
      companyId,
      valueId,
      updateCoreValueDto,
    );
  }

  @Delete(':companyId/core-values/:valueId')
  @UseGuards(JwtAuthGuard)
  removeCoreValue(
    @Param('companyId') companyId: string,
    @Param('valueId') valueId: string,
  ) {
    return this.companiesService.removeCoreValue(companyId, valueId);
  }
}
