interface PaymentInfoDTO {
  amountPayments?: number;
  codePix?: string;
  datePayment?: string;
}

export interface CreateOrderDTO extends PaymentInfoDTO {
  addressId: number;
}
