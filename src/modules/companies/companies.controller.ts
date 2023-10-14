import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { companieDto } from './dtos/companie.dto';
import { CompanyInterface } from './interfaces/company.interface';
import { CompaniesService } from './companies.service';
import { CompanyIdExistPipe } from "./pipe/id-exist.pipe";

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Get()
  async findAll(): Promise<Array<CompanyInterface>> {
    return this.service.findAll();
  }

  @Get(':idCompany')
  async findOne(@Param('idCompany', ParseIntPipe) idCompany: number): Promise<CompanyInterface> {
    return this.service.findOne(idCompany)
  }

  @Post()
  async create(@Body() body: companieDto): Promise<CompanyInterface> {
    return this.service.create(body);
  }

  @Put(':idCompany')
  async update(@Param('idCompany', ParseIntPipe, CompanyIdExistPipe) idCompany: number,  @Body() body: companieDto): Promise<CompanyInterface>{
    return this.service.update(idCompany, body);
  }
}
