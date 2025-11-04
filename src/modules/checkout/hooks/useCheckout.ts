import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCart } from '../../cart/hooks/useCart';
import { useAddress } from '../../address/hooks/useAddress';

export const useCheckout = () => {
  const navigation = useNavigation();
  const { cart } = useCart();
  const { addresses, fetchAddresses, addressLoading } = useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  const cartItems = useMemo(() => cart?.cartProduct || [], [cart]);
  const totalValue = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.product.price * item.amount, 0),
    [cartItems],
  );

  const handleContinueToPayment = () => {
    if (!selectedAddressId) {
      Alert.alert('Atenção', 'Por favor, selecione um endereço de entrega.');
      return;
    }

    (navigation.navigate as any)('PaymentScreen', {
      addressId: selectedAddressId,
      totalValue,
    });
  };

  const handleDeleteSuccess = () => {
    setSelectedAddressId(undefined);
    fetchAddresses();
  };

  const handleGoToCreateAddress = () => {
    (navigation.navigate as any)('CreateAddress');
  };

  return {
    addresses,
    addressLoading,
    selectedAddressId,
    setSelectedAddressId,
    handleContinueToPayment,
    handleDeleteSuccess,
    handleGoToCreateAddress,
    cartItems,
    totalValue,
  };
};
