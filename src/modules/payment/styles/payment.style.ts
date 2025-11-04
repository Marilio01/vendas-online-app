import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';

interface PaymentOptionProps {
  isSelected: boolean;
}
interface PaymentTextProps {
  isSelected: boolean;
}
interface CardProps {}
interface InstallmentProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #f9fafb;
`;

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #222;
`;

export const Card = styled.View<CardProps>`
  background-color: ${theme.colors.neutralTheme.white};
  border-radius: 12px;
  padding: 16px;
  margin: 0 16px 16px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

export const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

export const PaymentOption = styled.TouchableOpacity<PaymentOptionProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${(props: PaymentOptionProps) => (props.isSelected ? '#6C63FF' : '#ddd')};
  background-color: ${(props: PaymentOptionProps) => (props.isSelected ? '#F0ECFF' : '#fff')};
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 10px;
`;

export const PaymentLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const PaymentText = styled(Text)<PaymentTextProps>`
  font-size: 16px;
  color: ${(props: PaymentTextProps) => (props.isSelected ? '#6C63FF' : '#555')};
  font-weight: ${(props: PaymentTextProps) => (props.isSelected ? 'bold' : 'normal')};
`;

export const DropdownContainer = styled.View`
  position: relative;
  width: 100%;
`;

export const DropdownTrigger = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  background-color: #fff;
`;

export const DropdownTriggerText = styled(Text)`
  font-size: 16px;
  color: #555;
`;

export const InstallmentItem = styled.TouchableOpacity<InstallmentProps>`
  padding: 14px;
  background-color: ${(props: InstallmentProps) => (props.isSelected ? '#F0ECFF' : '#fff')};
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const InstallmentText = styled(Text)<InstallmentProps>`
  font-size: 16px;
  color: ${(props: InstallmentProps) => (props.isSelected ? '#6C63FF' : '#555')};
  font-weight: ${(props: InstallmentProps) => (props.isSelected ? 'bold' : 'normal')};
`;

export const SummaryTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const SummaryLabel = styled(Text)`
  font-size: 18px;
`;

export const SummaryValue = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #6c63ff;
`;

export const Footer = styled.View`
  padding: 16px;
  background-color: ${theme.colors.neutralTheme.white};
  border-top-width: 1px;
  border-color: #eee;
`;

export const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  width: 80%;
  max-height: 85%;
  background-color: ${theme.colors.neutralTheme.white};
  border-radius: 8px;
  padding: 24px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

export const ModalButtonWrapper = styled.View`
  width: 100%;
`;
