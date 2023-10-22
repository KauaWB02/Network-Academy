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
    const body = Object.assign(validationArguments.object);

    console.log(body.context);

    const entity = await service.findByEmail(
      email,
      body?.context.params.companyId,
    );
    return !entity;
  }
}
