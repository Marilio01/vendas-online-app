import styled from 'styled-components/native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

export const ContainerLogin = styled.View`
  background-color: ${theme.colors.neutral.background};
  align-items: center;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Imagelogo = styled.Image`
  width: 202px;
  height: 143px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: 34px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const SignUpText = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

export const SignUpLink = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.primary.main};
  font-weight: bold;
  margin-left: 5px;
  text-decoration: underline;
`;