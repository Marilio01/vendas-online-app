import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { AddressType } from '../../../shared/types/AddressType';
import { PaymentType } from '../../payment/hooks/usePayment';

interface CheckoutContextData {
  selectedAddress?: AddressType;
  setSelectedAddress: (address?: AddressType) => void;
  selectedPaymentMethod?: PaymentType;
  setSelectedPaymentMethod: (payment?: PaymentType) => void;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextData>({} as CheckoutContextData);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressType | undefined>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentType | undefined>();

  const clearCheckout = () => {
    setSelectedAddress(undefined);
    setSelectedPaymentMethod(undefined);
  };

  const value = useMemo(
    () => ({
      selectedAddress,
      setSelectedAddress,
      selectedPaymentMethod,
      setSelectedPaymentMethod,
      clearCheckout,
    }),
    [selectedAddress, selectedPaymentMethod],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
};
