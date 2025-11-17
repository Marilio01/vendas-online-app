import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const FullScreenLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.neutral.background};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 120, paddingTop: 16 },
})``;

export const Card = styled.View`
  background-color: ${theme.colors.neutral.surface};
  border-radius: 8px;
  padding: 16px;
  margin: 0 16px 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${theme.colors.text.primary};
`;

export const SummaryCard = styled(Card)``;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const SummaryLabel = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
`;

export const SummaryValue = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.primary};
  font-weight: 500;
`;

export const SectionButton = styled.TouchableOpacity`
  padding: 16px;
  margin: 0 16px 16px;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const SectionButtonTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 12px;
`;

export const SectionButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionButtonTextWrapper = styled.View`
  flex: 1;
`;

export const SectionButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 24px;
`;

export const SectionButtonLink = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.primary.main};
  margin-left: 8px;
`;

export const AddressPrompt = styled.View`
  padding: 8px 0;
`;

export const AddressPromptText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.brand.red};
`;

export const ProductItemContainer = styled.View`
  flex-direction: row;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.neutral.border};
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${theme.colors.neutral.surface};
  resize-mode: contain;
`;

export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

export const ProductInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProductName = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ProductPriceInline = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-left: 8px;
`;

export const ProductActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const CartQuantityWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CartQuantityButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const CartQuantityAmount = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  padding: 0 8px;
`;

export const Footer = styled.View`
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  border-top-width: 1px;
  border-top-color: ${theme.colors.neutral.border};
  elevation: 10;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background-color: ${theme.colors.neutral.surface};
  border-radius: 8px;
  padding: 24px;
  width: 80%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const ModalText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 24px;
`;
