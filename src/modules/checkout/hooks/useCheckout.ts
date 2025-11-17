import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../../cart/hooks/useCart';
import { useAddress } from '../../address/hooks/useAddress';
import { useCheckoutContext } from '../context/CheckoutContext';
import { PaymentType } from '../../payment/hooks/usePayment';
import {
  saveCheckoutPreferences,
  loadCheckoutPreferences,
} from '../../../shared/functions/checkoutPreferences';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';

export const useCheckout = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { cart, updateProductAmount, removeProductFromCart } = useCart();
  const { addresses, fetchAddresses, addressLoading } = useAddress();

  const { selectedAddress, setSelectedAddress, selectedPaymentMethod, setSelectedPaymentMethod } =
    useCheckoutContext();

  const [isInitializing, setIsInitializing] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  useEffect(() => {
    if (addressLoading) {
      setIsInitializing(true);
      return;
    }

    const loadPreferences = async () => {
      const data = await loadCheckoutPreferences();
      if (data) {
        const { addressId, paymentMethod } = data;

        if (addressId && addresses.length > 0) {
          const foundAddress = addresses.find((a) => a.id === addressId);
          if (foundAddress) setSelectedAddress(foundAddress);
        }
        if (paymentMethod) {
          setSelectedPaymentMethod(paymentMethod as PaymentType);
        }
      }

      setIsInitializing(false);
    };

    loadPreferences();
  }, [addresses, addressLoading, setSelectedAddress, setSelectedPaymentMethod]);

  useEffect(() => {
    const savePrefs = async () => {
      if (!isInitializing && (selectedAddress || selectedPaymentMethod)) {
        const addressId = selectedAddress ? selectedAddress.id : null;
        const paymentMethod = selectedPaymentMethod || null;
        await saveCheckoutPreferences(addressId, paymentMethod);
      }
    };
    savePrefs();
  }, [selectedAddress, selectedPaymentMethod, isInitializing]);

  const cartItems = useMemo(() => cart?.cartProduct || [], [cart]);

  useEffect(() => {
    if (!isInitializing && cartItems.length === 0) {
      navigation.navigate(MenuUrl.HOME, { screen: MenuUrl.CART });
    }
  }, [cartItems, isInitializing, navigation]);

  const totalValue = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.product.price * item.amount, 0),
    [cartItems],
  );

  const handleFinalizeOrder = async () => {
    if (!selectedAddress || !selectedPaymentMethod) {
      Alert.alert('Atenção', 'Por favor, selecione um endereço e uma forma de pagamento.');
      return;
    }
    await saveCheckoutPreferences(selectedAddress.id, selectedPaymentMethod);
    (navigation.navigate as any)('PaymentScreen', {
      addressId: selectedAddress.id,
      totalValue,
      paymentMethod: selectedPaymentMethod,
    });
  };

  const handleGoToAddressList = () => {
    (navigation.navigate as any)('AddressList');
  };

  const handleGoToPaymentList = () => {
    (navigation.navigate as any)('PaymentList');
  };

  const paymentMethodName = useMemo(() => {
    if (!selectedPaymentMethod) return 'Nenhum';
    return selectedPaymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito';
  }, [selectedPaymentMethod]);

  return {
    isInitializing,
    selectedAddress,
    setSelectedAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentMethodName,
    addressLoading: addressLoading || isInitializing,
    cartItems,
    totalValue,
    handleFinalizeOrder,
    handleGoToAddressList,
    handleGoToPaymentList,
    updateProductAmount,
    removeProductFromCart,
  };
};
