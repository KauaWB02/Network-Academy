import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CompanyInterface } from './interfaces/company.interface';
import { companieDto } from './dtos/companie.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(): Promise<Array<CompanyInterface>> {
    try {
      return await this.companyRepository.find();
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível obter as empresas',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<CompanyInterface> {
    try {
      const company = await this.companyRepository.findOneBy({ email });
      return company;
    } catch (Error) {
      console.log(Error)
      throw new HttpException(
        {
          message: `Não foi possível obter a empresa relacionada com o e-mail: ${email}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(id: number): Promise<CompanyInterface>{
    try {
      const company = await this.companyRepository.findOne({where: {id}});

      return  company;
    }catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível buscar empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: companieDto): Promise<CompanyInterface> {
    try {
      const { address, logoId, ...companyBody } = body;

      const companyEntity = Object.assign(new CompanyEntity(), companyBody);

      await this.companyRepository.save(companyEntity);

      return companyEntity;
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível criar a empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async  update(idCompany: number, body: companieDto): Promise<CompanyInterface>{
    try {
      const { address, logoId, ...companyBody } = body;

      const companyEntity = Object.assign(new CompanyEntity(), { id: idCompany ,...companyBody });

      await this.companyRepository.save(companyEntity);

      return companyEntity;
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível atualizar a empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
