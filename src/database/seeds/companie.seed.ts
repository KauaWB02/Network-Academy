import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CompanyEntity } from '../../modules/companies/entities/company.entity';

export class CompanieSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CompanyEntity);
    await repository.insert({
      id: 1,
      name: 'Empresa Matriz',
      cnpj: '11111111111',
      email: 'matriz@gmail.com',
      description: 'Empresa Matriz',
      city: 'Maceio',
      uf: 'AL',
      complement: 'Testando',
      neighborhood: 'Jacintinho',
      street: 'Rua alta da boa vista',
      logoId: 1,
    });
  }
}
