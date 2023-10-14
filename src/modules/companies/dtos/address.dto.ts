import { UfEnum } from '../../../shared/enums/uf.enum';
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class AddressDto {
  @IsNotEmpty({ message: 'Compo "CEP" é obrigatório ' })
  @IsString({ message: 'Campo "CEP" da empresa precisa ser string' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  cep: string;

  @IsNotEmpty({ message: 'Compo "LOGRADOURO" é obrigatório ' })
  @IsString({ message: 'Campo "LOGRADOURO" da empresa precisa ser string' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  logradouro: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Campo "BAIRRO" da empresa precisa ser string' })
  @IsNotEmpty({ message: 'Compo "BAIRRO" é obrigatório' })
  bairro: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Campo "CIDADE" da empresa precisa ser string' })
  @IsNotEmpty({ message: 'Compo "CIDADE" é obrigatório ' })
  cidade: string;

  @IsEnum(UfEnum, {
    message: 'UF inválido.',
  })
  @IsNotEmpty({ message: 'O campo "UF" é obrigatório. ' })
  uf: string;

  @IsNotEmpty({ message: 'Compo "COMPLEMENTO" é obrigatório' })
  @IsString({ message: 'Campo "COMPLEMENTO" da empresa precisa ser string' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  complemento?: string;
}
