import {
  Allow,
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { EmailAlreadyExist } from '../validate/email-already-exist.constraint';
import { CnpjValid } from '../validate/cnpj-valid.constraint';
import { UfEnum } from '../../../shared/enums/uf.enum';
export class companieDto {
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

  @Validate(CnpjValid, { message: 'Campo precisa ser CNPJ' })
  @Length(11, 15, { message: 'Campo precisa de 11 ou 15 caracteres' })
  @IsString({ message: 'Campo CNPJ/CPF precisa ser string' })
  @IsNotEmpty({ message: 'Campo CNPJ/CPF é obrigatório' })
  @IsDefined({ message: 'testandoooo' })
  cnpj: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Compo DESCRIÇÃO precisa ser string' })
  @IsNotEmpty({ message: 'Campo DESCRIÇÃO é obrigatório' })
  description: string;

  @IsNotEmpty({ message: 'O campo UF é obrigatório. ' })
  @IsEnum(UfEnum, {
    message: 'UF inválido.',
  })
  uf: string;

  @IsNotEmpty({ message: 'O campo UF é obrigatório. ' })
  @IsString({ message: 'O campo CIDADE precisa ser string.' })
  city: string;

  @IsNotEmpty({ message: 'O campo BAIRRO é obrigatório. ' })
  @IsString({ message: 'O campo BAIRRO precisa ser string.' })
  neighborhood: string;

  @IsNotEmpty({ message: 'O campo RUA é obrigatório. ' })
  @IsString({ message: 'O campo RUA precisa ser string.' })
  street: string;

  @IsString({ message: 'O campo COMPLEMENTO precisa ser string.' })
  @IsOptional()
  complement: string;

  @IsInt({ message: 'Campo logoId precisa ser um numero' })
  @IsOptional()
  logoId?: number;

  @Allow()
  context?: {
    params: { id?: number };
  };
}
