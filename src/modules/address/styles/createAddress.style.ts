import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${theme.colors.text.primary};
`;

export const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView).attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  enableOnAndroid: true,
  extraScrollHeight: 50,
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ButtonWrapper = styled.View`
  margin-top: 8px;
`;
