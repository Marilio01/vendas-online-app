import styled from 'styled-components/native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

export const ContainerLogin = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutralTheme.white};
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Imagelogo = styled.Image`
  width: 202px;
  height: 143px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${theme.colors.textTheme.primary};
  text-align: center;
  margin-bottom: 34px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
`;

export const SignUpText = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.textTheme.secondary};
`;

export const SignUpLink = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.blueTheme.primary};
  font-weight: bold;
  margin-left: 5px;
  text-decoration: underline;
`;