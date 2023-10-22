import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Not, Repository } from 'typeorm';
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

  async findByEmail(
    email: string,
    companyId: number,
  ): Promise<CompanyInterface> {
    try {
      const company = await this.companyRepository.findOneBy({
        email,
        id: Not(companyId),
      });
      return company;
    } catch (Error) {
      console.log(Error);
      throw new HttpException(
        {
          message: `Não foi possível obter a empresa relacionada com o e-mail: ${email}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<CompanyInterface> {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      return company;
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível buscar empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    body: companieDto,
  ): Promise<{ data: CompanyInterface; message: string }> {
    try {
      const companyEntity = Object.assign(new CompanyEntity(), { ...body });

      await this.companyRepository.save(companyEntity);

      return { data: companyEntity, message: 'Empresa criada com sucesso.' };
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível criar a empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    idCompany: number,
    body: companieDto,
  ): Promise<{ data: CompanyInterface; message: string }> {
    try {
      const companyEntity = Object.assign(new CompanyEntity(), {
        ...body,
        id: idCompany,
      });

      await this.companyRepository.save(companyEntity);

      return {
        data: companyEntity,
        message: 'Empresa atualizada com sucesso!',
      };
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível atualizar a empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(companyId: number): Promise<{ message: string }> {
    try {
      await this.companyRepository.softDelete({ id: companyId });
      return {
        message: 'Empresa excluida com sucesso.',
      };
    } catch (Error) {
      throw new HttpException(
        {
          message: 'Não foi possível excluir a empresa',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
