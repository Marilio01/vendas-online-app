import { Animated, View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 17px;
`;

interface ContainerProps {
  borderColor: string;
  isEditable: boolean;
}
export const Container = styled.View<ContainerProps>`
  border-width: 1px;
  border-radius: 8px;
  justify-content: center;
  height: 52px;
  border-color: ${({ borderColor }: ContainerProps) => borderColor};
  background-color: ${({ isEditable }: ContainerProps) =>
    isEditable ? theme.colors.neutral.surface : theme.colors.neutral.border};
`;

export const Input = styled.TextInput.attrs<{ isEditable: boolean }>({
  placeholderTextColor: theme.colors.text.secondary,
})`
  height: 100%;
  padding: 18px 50px 0 16px;
  font-size: 16px;
  color: ${({ isEditable }: { isEditable: boolean }) =>
    isEditable ? theme.colors.text.primary : theme.colors.text.secondary};
`;

interface LabelProps {
  isEditable: boolean;
  theme: typeof theme;
}

export const Label = styled(Animated.Text)<{ isEditable: boolean }>`
  position: absolute;
  left: 16px;
  color: ${({ isEditable, theme }: LabelProps) =>
    isEditable ? theme.colors.text.secondary : theme.colors.text.secondary};
`;

export const ToggleButton = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled(View)`
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
  color: ${theme.colors.semantic.error};
  font-size: 14px;
  margin-left: 4px;
`;
