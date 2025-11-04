import { AddressType } from "./AddressType";
import { OrderProductType } from "./OrderProductType";
import { PaymentType } from "./PaymentType";
import { UserType } from "./userType";

export interface OrderType {
  id: number;
  date: string;
  userId: number;
  user: UserType;
  amountProducts: number;
  payment?: PaymentType;
  address?: AddressType;
  ordersProduct?: OrderProductType[];
}