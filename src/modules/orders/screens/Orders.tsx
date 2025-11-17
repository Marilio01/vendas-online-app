import React, { useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as S from '../styles/orders.style';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { OrderType } from '../../../shared/types/OrderType';
import { useOrderList } from '../hooks/useOrderList';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../../shared/themes/theme';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { orders, listLoading, refetchUserOrders } = useOrderList();

  useFocusEffect(
    useCallback(() => {
      refetchUserOrders();
    }, []),
  );

  const orderedOrders = useMemo(() => {
    const sortedDesc = [...orders].sort((a, b) => b.id - a.id);
    const totalCount = sortedDesc.length;

    return sortedDesc.map((order, index, arr) => ({
      ...order,
      displayId: totalCount - index,
    }));
  }, [orders]);

  const handleOrderPress = (orderId: number, displayId: number) => {
    (navigation.navigate as any)('OrderDetails', { orderId, displayId });
  };

  const renderEmptyComponent = () => (
    <S.EmptyContainer>
      <Icon name="shopping-bag" size={48} color={theme.colors.neutral.disabled} />
      <S.EmptyText>Nenhum pedido encontrado</S.EmptyText>
    </S.EmptyContainer>
  );

  const renderItem = ({ item }: { item: OrderType & { displayId: number } }) => (
    <S.OrderItem onPress={() => handleOrderPress(item.id, item.displayId)}>
      <S.OrderInfo>
        <S.OrderId>Pedido #{item.displayId}</S.OrderId>
        <S.OrderDate>{formatDate(item.date)}</S.OrderDate>
      </S.OrderInfo>
      <S.OrderPrice>{convertNumberToMoney(item.payment?.finalPrice || 0)}</S.OrderPrice>
    </S.OrderItem>
  );

  return (
    <S.Container>
      {listLoading && orders.length === 0 ? (
        <S.LoadingIndicator />
      ) : (
        <S.OrderList
          data={orderedOrders}
          renderItem={renderItem}
          keyExtractor={(item: OrderType) => item.id.toString()}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </S.Container>
  );
};

export default OrdersScreen;
