import { useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { displayLocalNotification } from '../../../shared/services/notificationsSevices';
import { useOrder } from '../../orders/hooks/useOrder';
import { CreateOrderDTO } from '../../../shared/types/createOrderDTO';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';

export type PaymentType = 'credit_card' | 'pix';

const MOCK_PIX_CODE = '00020126580014BR.GOV.BCB.PIX0136...';

export const usePayment = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();

  const { addressId, totalValue, paymentMethod } = route.params as {
    addressId: number;
    totalValue: number;
    paymentMethod: PaymentType;
  };

  const { createOrder, orderLoading } = useOrder();
  const { clearCart } = useCartReducer();

  const [amountPayments, setAmountPayments] = useState<number>(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmOrder = async () => {
    if (!paymentMethod) return;

    const orderDTO: CreateOrderDTO = { addressId };

    if (paymentMethod === 'credit_card') {
      orderDTO.amountPayments = amountPayments > 0 ? amountPayments : 1;
    } else if (paymentMethod === 'pix') {
      orderDTO.codePix = MOCK_PIX_CODE;
      orderDTO.datePayment = new Date().toISOString();
    }

    const success = await createOrder(orderDTO);

    if (success) {
      clearCart();
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
    selectedPaymentType: paymentMethod,
    amountPayments,
    setAmountPayments,
    handleConfirmOrder,
    orderLoading,
    totalValue,
    showSuccessModal,
    handleContinueShopping,
    handleViewOrders,
    codePix: MOCK_PIX_CODE,
  };
};
