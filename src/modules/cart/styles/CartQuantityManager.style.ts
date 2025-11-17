import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const Container = styled.View`
  width: 100%;
  height: 40px;
  background-color: ${theme.colors.neutral.surface};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px 20px;
`;

export const Amount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;
