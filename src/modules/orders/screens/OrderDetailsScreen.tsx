import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useOrderDetails } from '../hooks/useOrderDetails';
import * as S from '../styles/orderDetails.style';
import { theme } from '../../../shared/themes/theme';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { PaymentType } from '../../../shared/types/PaymentType';

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getPaymentMethod = (payment?: PaymentType): string => {
  if (!payment?.type) return 'Não informado';

  switch (payment.type) {
    case 'PaymentPixEntity':
      return 'PIX';
    case 'PaymentCreditCardEntity':
      const installments = payment.amountPayments || 1;
      return `Cartão de Crédito (${installments}x)`;
    default:
      return payment.type;
  }
};

const OrderDetailsScreen = () => {
  const route = useRoute();
  const { orderId, displayId } = route.params as { orderId: number; displayId: number };

  const { orderDetails, loading, fetchOrderDetails } = useOrderDetails();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </S.LoadingContainer>
    );
  }

  if (!orderDetails) {
    return (
      <S.LoadingContainer>
        <S.CardTitle style={{ textAlign: 'center' }}>Erro ao carregar o pedido.</S.CardTitle>
      </S.LoadingContainer>
    );
  }

  const total = orderDetails.payment?.finalPrice || 0;
  const installments = orderDetails.payment?.amountPayments || 1;
  const installmentValue = total / installments;

  return (
    <S.Container>
      <S.Card>
        <S.CardTitle>Resumo do Pedido</S.CardTitle>
        <S.InfoRow>
          <S.InfoLabel>Pedido Nº:</S.InfoLabel>
          <S.InfoValue>#{displayId || orderDetails.id}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Data:</S.InfoLabel>
          <S.InfoValue>{formatDateTime(orderDetails.date)}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Status:</S.InfoLabel>
          <S.InfoValue>{orderDetails.payment?.paymentStatus?.name || 'Concluído'}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Pagamento:</S.InfoLabel>
          <S.InfoValue>{getPaymentMethod(orderDetails.payment)}</S.InfoValue>
        </S.InfoRow>
        {orderDetails.payment?.type === 'PaymentCreditCardEntity' && (
          <S.InfoRow>
            <S.InfoLabel>Valor da Parcela:</S.InfoLabel>
            <S.InfoValue>{convertNumberToMoney(installmentValue)}</S.InfoValue>
          </S.InfoRow>
        )}
      </S.Card>

      <S.Card>
        <S.CardTitle>Produtos</S.CardTitle>
        {orderDetails.ordersProduct?.map((item) => (
          <S.ProductItem key={item.id}>
            <S.ProductImage source={{ uri: item.product?.image }} />
            <S.ProductInfo>
              <S.ProductName>{item.product?.name || 'Produto'}</S.ProductName>
              <S.ProductAmount>Qtd: {item.amount}</S.ProductAmount>
              <S.ProductAmount style={{ fontSize: 14, color: theme.colors.text.secondary }}>
                {convertNumberToMoney(item.price)}/un.
              </S.ProductAmount>
            </S.ProductInfo>
            <S.ProductPrice>{convertNumberToMoney(item.amount * item.price)}</S.ProductPrice>
          </S.ProductItem>
        ))}
        <S.Divider />
        <S.TotalRow>
          <S.TotalLabel>Total:</S.TotalLabel>
          <S.TotalValue>{convertNumberToMoney(total)}</S.TotalValue>
        </S.TotalRow>
      </S.Card>

      <S.Card>
        <S.CardTitle>Dados do Cliente</S.CardTitle>
        <S.InfoRow>
          <S.InfoLabel>Nome:</S.InfoLabel>
          <S.InfoValue>{orderDetails.user?.name}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Email:</S.InfoLabel>
          <S.InfoValue>{orderDetails.user?.email}</S.InfoValue>
        </S.InfoRow>
      </S.Card>

      <S.Card>
        <S.CardTitle>Endereço de Entrega</S.CardTitle>
        <S.InfoRow>
          <S.InfoValue style={{ textAlign: 'left' }}>
            {`${orderDetails.address?.street}, ${orderDetails.address?.numberAddress}`}
          </S.InfoValue>
        </S.InfoRow>

        {!!orderDetails.address?.complement && (
          <S.InfoRow>
            <S.InfoValue style={{ textAlign: 'left' }}>
              {orderDetails.address?.complement}
            </S.InfoValue>
          </S.InfoRow>
        )}

        <S.InfoRow>
          <S.InfoValue style={{ textAlign: 'left' }}>
            {`${orderDetails.address?.city?.name} - ${orderDetails.address?.city?.state?.uf}`}
          </S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoValue style={{ textAlign: 'left' }}>CEP: {orderDetails.address?.cep}</S.InfoValue>
        </S.InfoRow>
      </S.Card>
    </S.Container>
  );
};

export default OrderDetailsScreen;
