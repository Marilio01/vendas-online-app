import styled from 'styled-components/native';
import { FlatList, FlatListProps, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';
import { OrderType } from '../../../shared/types/OrderType';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.neutralTheme.white};
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin: 20px 16px;
  color: ${theme.colors.neutralTheme.black};
`;

export const OrderList = styled(
  FlatList as new (props: FlatListProps<OrderType>) => FlatList<OrderType>,
).attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})``;

export const OrderItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.grayTheme.gray50};
`;

export const OrderInfo = styled(View)`
  flex: 1;
`;

export const OrderId = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.neutralTheme.black};
`;

export const OrderDate = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.grayTheme.gray100};
  margin-top: 4px;
`;

export const OrderPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.mainTheme.primary};
  margin-left: 10px;
`;

export const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 16px;
`;

export const EmptyText = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.grayTheme.gray100};
  text-align: center;
`;

export const LoadingIndicator = styled(ActivityIndicator).attrs({
  size: 'large',
  color: theme.colors.mainTheme.primary,
})`
  margin-top: 50px;
`;
