import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { companieDto } from './dtos/companie.dto';
import { CompanyInterface } from './interfaces/company.interface';
import { CompaniesService } from './companies.service';
import { CompanyIdExistPipe } from './pipe/id-exist.pipe';
import { StripContextPipe } from '../../shared/interceptors/values-request';
import { ContextInterceptor } from '../../shared/interceptors/values-request-body-params';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Get()
  async findAll(): Promise<Array<CompanyInterface>> {
    return this.service.findAll();
  }

  @Get(':idCompany')
  async findOne(
    @Param('idCompany', ParseIntPipe) idCompany: number,
  ): Promise<CompanyInterface> {
    return this.service.findOne(idCompany);
  }

  @Post()
  async create(
    @Body() body: companieDto,
  ): Promise<{ data: CompanyInterface; message: string }> {
    return this.service.create(body);
  }

  @Put(':companyId')
  @UseInterceptors(ContextInterceptor)
  async update(
    @Param('companyId', ParseIntPipe, CompanyIdExistPipe) companyId: number,
    @Body(StripContextPipe) body: companieDto,
  ): Promise<{ data: CompanyInterface; message: string }> {
    return this.service.update(companyId, body);
  }

  @Delete(':companyId')
  async delete(
    @Param('companyId', ParseIntPipe, CompanyIdExistPipe) companyId: number,
  ): Promise<{ message: string }> {
    return this.service.delete(companyId);
  }
}
