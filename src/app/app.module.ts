import { Module } from '@nestjs/common';

//Providers
import { EnvironmentProviderModule } from '../providers/environment/environment.provider';

//Modules
import { CompaniesModule } from '../modules/companies/companies.module';
import { DatabaseProviderModule } from '../providers/dataBase/database.provider';

@Module({
  imports: [EnvironmentProviderModule, DatabaseProviderModule, CompaniesModule],
})
export class AppModule {}
