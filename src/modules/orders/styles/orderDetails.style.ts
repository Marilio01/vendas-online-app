import styled from 'styled-components/native';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: { paddingBottom: 32, paddingHorizontal: 16 },
})`
  flex: 1;
  background-color: ${theme.colors.neutralTheme.white};
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.neutralTheme.white};
`;

export const Card = styled(View)`
  background-color: ${theme.colors.neutralTheme.white};
  padding: 24px 0;
  margin: 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.grayTheme.gray50};
  elevation: 0;
`;

export const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.neutralTheme.black};
  margin-bottom: 16px;
`;

export const InfoRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const InfoLabel = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.neutralTheme.black};
`;

export const InfoValue = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.neutralTheme.black};
  font-weight: 600;
  text-align: right;
  flex: 1;
  margin-left: 10px;
`;

export const Divider = styled(View)`
  height: 1px;
  background-color: ${theme.colors.grayTheme.gray50};
  margin: 16px 0;
`;

export const ProductItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ProductInfo = styled(View)`
  flex: 1;
  margin-right: 10px;
`;

export const ProductName = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.grayTheme.gray100};
`;

export const ProductAmount = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.grayTheme.gray100};
  margin-top: 2px;
`;

export const ProductPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.grayTheme.gray100};
`;

export const TotalRow = styled(InfoRow)`
  margin-top: 16px;
  margin-bottom: 0;
`;

export const TotalLabel = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.neutralTheme.black};
`;

export const TotalValue = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.mainTheme.primary};
`;
