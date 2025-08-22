
import { CartProductType } from './cartProductType';

export interface CartType {
  id: number;
  cartProduct: CartProductType[];
}