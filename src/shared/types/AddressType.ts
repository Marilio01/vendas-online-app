import { CityType } from './CityType';

export interface CreateAddressType {
  cep: string;
  street: string;
  neighborhood: string;
  numberAddress: number;
  complement?: string;
  cityId: number;
}

export interface AddressType {
  id: number;
  street: string;
  neighborhood: string;
  cep: string;
  numberAddress: number;
  complement: string;
  city?: CityType;
}