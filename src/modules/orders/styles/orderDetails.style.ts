import styled from 'styled-components/native';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.neutral.background};
`;

export const Card = styled(View)`
  background-color: ${theme.colors.neutral.surface};
  border-radius: 12px;
  padding: 16px;
  margin: 16px 16px 0 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InfoRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const InfoLabel = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
`;

export const InfoValue = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.text.primary};
  font-weight: 600;
  text-align: right;
  flex: 1;
  margin-left: 10px;
`;

export const Divider = styled(View)`
  height: 1px;
  background-color: ${theme.colors.neutral.border};
  margin: 16px 0 8px;
`;

export const ProductItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
`;

export const ProductImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${theme.colors.neutral.surface};
  resize-mode: contain;
`;

export const ProductInfo = styled(View)`
  flex: 1;
  margin: 0 10px;
`;

export const ProductName = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ProductAmount = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  margin-top: 2px;
`;

export const ProductPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

export const TotalRow = styled(InfoRow)`
  margin-top: 16px;
  margin-bottom: 0;
`;

export const TotalLabel = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

export const TotalValue = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.primary.main};
`;
