import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as S from '../styles/orders.style';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { OrderType } from '../../../shared/types/OrderType';
import { useOrderList } from '../hooks/useOrderList';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { orders, listLoading } = useOrderList();

  const handleOrderPress = (orderId: number) => {
    (navigation.navigate as any)('OrderDetails', { orderId });
  };

  const renderEmptyComponent = () => (
    <S.EmptyContainer>
      <S.EmptyText>Nenhum pedido encontrado</S.EmptyText>
    </S.EmptyContainer>
  );

  const renderItem = ({ item }: { item: OrderType }) => (
    <S.OrderItem onPress={() => handleOrderPress(item.id)}>
      <S.OrderInfo>
        <S.OrderId>Pedido #{item.id}</S.OrderId>
        <S.OrderDate>{formatDate(item.date)}</S.OrderDate>
      </S.OrderInfo>
      <S.OrderPrice>{convertNumberToMoney(item.payment?.finalPrice || 0)}</S.OrderPrice>
    </S.OrderItem>
  );

  return (
    <S.Container>
      <S.Title>Meus Pedidos</S.Title>
      {listLoading && orders.length === 0 ? (
        <S.LoadingIndicator />
      ) : (
        <S.OrderList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item: OrderType) => item.id.toString()}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </S.Container>
  );
};

export default OrdersScreen;
