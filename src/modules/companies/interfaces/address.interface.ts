import { UfEnum } from '../../../shared/enums/uf.enum';

export interface AddressInterface {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: UfEnum;
  complemento?: string;
}
