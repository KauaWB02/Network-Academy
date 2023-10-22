export interface CompanyInterface {
  id?: number;
  name: string;
  email: string;
  cnpj: string;
  description: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  logoId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
