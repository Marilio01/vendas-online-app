import styled from 'styled-components/native';
import Text from '../../../shared/components/text/Text';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.neutralTheme.white};
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

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${(props: any) => props.theme.colors.neutralTheme.black};
`;

export const ButtonWrapper = styled.View`
  margin-top: 8px;
`;
