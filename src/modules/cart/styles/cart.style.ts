import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.neutral.surface};
  margin: 8px 16px;
  padding: 16px;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${theme.colors.neutral.surface};
  resize-mode: contain;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

export const ProductTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProductName = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  margin-right: 8px;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
`;

export const QuantityAndDeleteRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const CartQuantityWrapper = styled.View`
  flex-direction: row;
  align-items: center;
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

export const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const Footer = styled.View`
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  elevation: 10;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TotalText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
`;

export const TotalValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.primary.main};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
  margin-top: 16px;
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
