import {
  IsDefined,
  IsEmail, IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested
} from "class-validator";
import { AddressDto } from './address.dto';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { EmailAlreadyExist } from '../validate/email-already-exist.constraint';
import { CnpjValid } from '../validate/cnpj-valid.constraint';
export class companieDto{

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Campo NOME da empresa precisa ser string' })
  @IsNotEmpty({ message: 'Compo NOME é obrigatório ' })
  name: string;

  @Validate(EmailAlreadyExist, { message: 'E-mail não permitido' })
  @IsEmail({}, { message: 'O campo E-MAIL deve ser válido.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'O campo E-MAIL deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo E-MAIL é obrigatório. ' })
  email: string;

  @Validate(CnpjValid, { message: 'Campo precisa ser CNPJ ou CPF valido' })
  @Length(11, 15, { message: 'Campo precisa de 11 ou 15 caracteres' })
  @IsString({ message: 'Campo CNPJ/CPF precisa ser string' })
  @IsNotEmpty({ message: 'Campo CNPJ/CPF é obrigatório' })
  @IsDefined({ message: 'testandoooo' })
  cnpj: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Compo DESCRIÇÃO precisa ser string' })
  @IsNotEmpty({ message: 'Campo DESCRIÇÃO é obrigatório' })
  description: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Compo SITE precisa ser string' })
  @IsNotEmpty({ message: 'Campo SITE é obrigatório' })
  @IsOptional()
  site: string;

  /*
   *
   * Ver como vai ser isso aqui;
   *
   */
  logoId?: number;

  @Type(() => AddressDto)
  @ValidateNested({ each: true })
  @IsObject({ message: 'Campos de ENDEREÇO precisa ser um objeto' })
  @IsNotEmpty({ message: 'Campo ENDEREÇO é obrigatório' })
  @IsOptional()
  address?: AddressDto;
}
