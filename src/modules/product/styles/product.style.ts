import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ScrollViewContainer = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ImageWrapper = styled(View)`
  width: 100%;
  height: 300px;
  background-color: ${theme.colors.neutral.surface};
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

export const InfoContainer = styled(View)`
  padding: 24px 16px;
  background-color: ${theme.colors.neutral.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 0;
  padding-bottom: 80px;
`;

export const ProductName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const ReviewWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;
export const ReviewText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  margin-left: 8px;
`;

export const PriceRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PriceContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

export const ProductPrice = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
`;
export const OldPrice = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;
export const DiscountBadge = styled(View)`
  background-color: ${theme.colors.semantic.error};
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 12px;
`;
export const DiscountText = styled.Text`
  color: ${theme.colors.neutral.surface};
  font-size: 14px;
  font-weight: 600;
`;

export const QuantityWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.colors.neutral.border};
  border-radius: 20px;
`;
export const QuantityButton = styled.TouchableOpacity`
  padding: 8px 12px;
`;
export const QuantityAmount = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  padding: 0 8px;
`;

export const ProductDescription = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 24px;
`;

export const Footer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: ${theme.colors.neutral.background};
  flex-direction: row;
  align-items: center;
`;
