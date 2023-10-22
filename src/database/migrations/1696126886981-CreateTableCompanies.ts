import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UfEnum } from '../../shared/enums/uf.enum';

export class CreateTableCompanies1696126886981 implements MigrationInterface {
  private companiesTable = new Table({
    name: 'companies',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'cnpj',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'uf',
        type: 'enum',
        enum: Object.values(UfEnum),
      },
      {
        name: 'city',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'neighborhood',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'street',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'complement',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'logo_id',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.companiesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.companiesTable);
  }
}
