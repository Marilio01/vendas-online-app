import styled from 'styled-components/native';
import { theme } from '../../themes/theme';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ContainerModal = styled.View`
  width: 100%;
  max-width: 400px;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 16px;
  padding: 24px;
  align-items: center;
  z-index: 9;

  shadow-color: ${theme.colors.neutral.textPrimary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 10;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  text-align: center;
`;

export const BodyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: 8px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 24px;
`;

export const IconWrapper = styled.View`
  margin-bottom: 16px;
  align-items: center;
`;
