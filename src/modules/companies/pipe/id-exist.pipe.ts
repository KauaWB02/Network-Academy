import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { CompanyEntity } from "../entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async transform(idCompany: number): Promise<number> {
    const company = await this.companyRepository.exist({where: {id: idCompany}})

    if (!company) {
      throw new NotFoundException('Empresa não encontrado', `Não foi possível encontrar uma empresa com esse ID: ${idCompany}`);
    }

    return idCompany;
  }
}