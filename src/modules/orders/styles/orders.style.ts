import styled from 'styled-components/native';
import { FlatList, FlatListProps, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';
import { OrderType } from '../../../shared/types/OrderType';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const OrderList = styled(
  FlatList as new (props: FlatListProps<OrderType>) => FlatList<OrderType>,
).attrs({
  contentContainerStyle: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
})``;

export const OrderItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 12px;
  margin-bottom: 12px;

  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const OrderInfo = styled(View)`
  flex: 1;
`;

export const OrderId = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

export const OrderDate = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  margin-top: 4px;
`;

export const OrderPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.primary.main};
  margin-left: 10px;
`;

export const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const EmptyText = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: 16px;
`;

export const LoadingIndicator = styled(ActivityIndicator).attrs({
  size: 'large',
  color: theme.colors.primary.main,
})`
  margin-top: 50px;
`;
