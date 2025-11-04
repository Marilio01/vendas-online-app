import { useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { displayLocalNotification } from '../../../shared/services/notificationsSevices';
import { useOrder } from '../../orders/hooks/useOrder';
import { CreateOrderDTO } from '../../../shared/types/createOrderDTO';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';

export type PaymentType = 'credit_card' | 'pix';

export const usePayment = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { addressId, totalValue } = route.params as { addressId: number; totalValue: number };
  const { createOrder, orderLoading } = useOrder();

  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | undefined>();
  const [amountPayments, setAmountPayments] = useState<number>(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmOrder = async () => {
    if (!selectedPaymentType) return;

    const orderDTO: CreateOrderDTO = { addressId };

    if (selectedPaymentType === 'credit_card') {
      orderDTO.amountPayments = amountPayments > 0 ? amountPayments : 1;
    } else if (selectedPaymentType === 'pix') {
      orderDTO.codePix = 'PIX-MOCK-CODE-FROM-APP';
      orderDTO.datePayment = new Date().toISOString();
    }

    const success = await createOrder(orderDTO);

    if (success) {
      setShowSuccessModal(true);
      displayLocalNotification(
        'Pedido Confirmado! ✅',
        `Seu pedido no valor de ${convertNumberToMoney(
          totalValue,
        )} foi recebido e já está sendo preparado.`,
      );
    }
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigation.navigate(MenuUrl.HOME, { screen: MenuUrl.HOME_TAB });
  };

  const handleViewOrders = () => {
    setShowSuccessModal(false);
    navigation.navigate(MenuUrl.HOME, { screen: MenuUrl.ORDER });
  };

  return {
    selectedPaymentType,
    setSelectedPaymentType,
    amountPayments,
    setAmountPayments,
    handleConfirmOrder,
    orderLoading,
    totalValue,
    showSuccessModal,
    handleContinueShopping,
    handleViewOrders,
  };
};
