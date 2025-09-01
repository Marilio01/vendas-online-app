import { CityType } from './CityType';

export interface AddressType {
  id: number;
  street: string;
  numberAddress: number;
  complement: string;
  neighborhood: string;
  cep: string;
  cityId: number;
  city: CityType;
}

export interface CreateAddressType {
  street: string;
  numberAddress: number;
  complement: string;
  neighborhood: string;
  cep: string;
  cityId: number;
}