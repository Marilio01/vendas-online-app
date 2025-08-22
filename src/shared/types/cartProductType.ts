
import { ProductType } from './productType';

export interface CartProductType {
  id: number;
  amount: number;
  product: ProductType;
}