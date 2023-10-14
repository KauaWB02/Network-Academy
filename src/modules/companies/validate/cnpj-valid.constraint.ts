import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { CompaniesService } from '../companies.service';

@ValidatorConstraint()
export class CnpjValid implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    if (text.length === 11) {
      return this.validaCPf(text);
    } else if (text.length === 14) {
      return this.validaCNPJ(text);
    }
    return false;
  }

  private validaCPf(cpf: string): boolean {
    // Remove todos os caracteres que não são dígitos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos após a remoção de não dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digito1 = soma % 11;
    digito1 = digito1 < 2 ? 0 : 11 - digito1;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digito2 = soma % 11;
    digito2 = digito2 < 2 ? 0 : 11 - digito2;

    // Verifica se os dígitos verificadores estão corretos
    if (
      parseInt(cpf.charAt(9)) === digito1 &&
      parseInt(cpf.charAt(10)) === digito2
    ) {
      return true;
    } else {
      return false;
    }
  }

  private validaCNPJ(cnpj: string): boolean {
    // Remove todos os caracteres que não são dígitos
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ possui 14 dígitos após a remoção de não dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verifica se todos os dígitos são iguais, o que não é válido
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    // Calcula o segundo dígito verificador
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    return true;
  }
}
