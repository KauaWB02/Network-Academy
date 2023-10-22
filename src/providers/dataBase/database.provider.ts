import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from './database-entities.provider';
import { MainSeeder } from '../../database/run-seeder';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        type: configService.get<string>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: entities,
        logging: configService.get<string>('APP_MODE') !== 'prod',
        migrations: [
          path.join(__dirname, '../../database/migrations/*{.ts,.js}'),
        ],
        cli: {
          migrationsDir: __dirname + 'src/database/migrations',
        },
        synchronize: false,
        seeds: [MainSeeder],
      }),
    }),
  ],
})
export class DatabaseProviderModule {}
