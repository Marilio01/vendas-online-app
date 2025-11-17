import styled, { css } from 'styled-components/native';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { theme } from '../../../shared/themes/theme';
import { DefaultTheme } from 'styled-components';

const CardStyles = css`
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

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${theme.colors.text.primary};
`;

export const Card = styled(View)`
  ${CardStyles}
`;

export const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${theme.colors.text.primary};
`;

export const PaymentOption = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  margin-bottom: 8px;
  border-color: ${({ isSelected, theme }: { isSelected: boolean; theme: DefaultTheme }) =>
    isSelected ? theme.colors.primary.main : theme.colors.neutral.border};
  background-color: ${({ isSelected, theme }: { isSelected: boolean; theme: DefaultTheme }) =>
    isSelected ? theme.colors.primary.light : theme.colors.neutral.surface};
`;

export const PaymentLeft = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const PaymentText = styled(Text)<{ isSelected: boolean }>`
  font-size: 16px;
  margin-left: 12px;
  font-weight: ${({ isSelected }: { isSelected: boolean }) => (isSelected ? '600' : '400')};
  color: ${({ isSelected, theme }: { isSelected: boolean; theme: DefaultTheme }) =>
    isSelected ? theme.colors.primary.main : theme.colors.text.primary};
`;

export const DropdownContainer = styled(View)``;

export const DropdownTrigger = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${theme.colors.neutral.border};
`;

export const DropdownTriggerText = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.text.primary};
`;

export const SummaryTotal = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const SummaryLabel = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
`;

export const SummaryValue = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

export const Footer = styled(View)`
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  border-top-width: 1px;
  border-top-color: ${theme.colors.neutral.border};
  elevation: 10;
`;

export const ModalOverlay = styled(TouchableOpacity)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalContent = styled(Pressable)`
  ${CardStyles}
  width: 100%;
  max-height: 80%;
  margin: 0;
`;

export const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
  text-align: center;
`;

export const InstallmentItem = styled(TouchableOpacity)<{ isSelected: boolean }>`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.neutral.border};
  background-color: ${({ isSelected, theme }: { isSelected: boolean; theme: DefaultTheme }) =>
    isSelected ? theme.colors.primary.light : 'transparent'};
`;

export const InstallmentText = styled(Text)<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: ${({ isSelected }: { isSelected: boolean }) => (isSelected ? '600' : '400')};
  color: ${({ isSelected, theme }: { isSelected: boolean; theme: DefaultTheme }) =>
    isSelected ? theme.colors.primary.main : theme.colors.text.primary};
`;

export const ModalButtonWrapper = styled(View)`
  width: 100%;
  margin-top: 16px;
`;

export const QRCodeContainer = styled(View)`
  align-items: center;
  padding: 16px 0;
  border-top-width: 1px;
  border-top-color: ${theme.colors.neutral.border};
  margin-top: 16px;
`;

export const QRCodeLabel = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: 8px;
`;
