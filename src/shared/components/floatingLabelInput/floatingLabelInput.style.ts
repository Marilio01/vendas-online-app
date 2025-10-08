import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 17px;
`;

interface ContainerProps {
  borderColor: string;
}
export const Container = styled.View<ContainerProps>`
  border-width: 1px;
  border-radius: 8px;
  justify-content: center;
  height: 52px;
  border-color: ${({ borderColor }: ContainerProps) => borderColor};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.neutralTheme.black,
})`
  height: 100%;
  padding: 18px 50px 0 16px;
  font-size: 16px;
  color: ${theme.colors.neutralTheme.black};
`;

export const Label = styled(Animated.Text)`
  position: absolute;
  left: 16px;
`;

export const ToggleButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  height: 100%;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  margin-left: 8px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.redTheme.red};
  font-size: 14px;
  margin-left: 4px;
`;