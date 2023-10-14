import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyEntity } from './entities/company.entity';
import { EmailAlreadyExist } from './validate/email-already-exist.constraint';
import { CnpjValid } from './validate/cnpj-valid.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompaniesController],
  providers: [CompaniesService, EmailAlreadyExist, CnpjValid],
  exports: [],
})
export class CompaniesModule {}
