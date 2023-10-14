import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CompanyEntity } from '../../modules/companies/entities/company.entity';

export class CompanieSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CompanyEntity);
    await repository.insert([
      {
        id: 1,
        cnpj: '11111111111',
        description: 'empresa teste',
        email: 'testando@gmail.com',
        name: 'Empresa mybox',
      },
    ]);
  }
}
