import { AddressInterface } from './address.interface';

export interface CompanyInterface {
  name: string;
  email: string;
  cnpj: string;
  description: string;
  site: string;
  logoId?: number;
  address?: AddressInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
