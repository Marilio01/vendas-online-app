import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;

export const FormSection = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${theme.colors.text.primary};
`;

export const ButtonWrapper = styled.View`
  margin-top: 8px;
`;
