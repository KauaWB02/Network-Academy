import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { CompaniesService } from '../companies.service';

let service: CompaniesService;

@ValidatorConstraint({ name: 'EmailAlreadyExist', async: true })
export class EmailAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CompaniesService);
  }

  async validate(
    email: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
      console.log('Passou aqui no email')

    const entity = await service.findByEmail(email);
    return !entity;
  }
}
