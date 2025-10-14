import styled, { DefaultTheme } from 'styled-components/native';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

export const ContainerCreateUser = styled.View`
  width: 100%;
  align-items: center;
  background-color: ${theme.colors.neutralTheme.white};
  padding: 24px;
`;

export const Imagelogo = styled.Image`
  width: 120px;
  height: 85px;
  margin-bottom: 24px;
`;

export const Title = styled(Text)`
  font-size: 36px;
  font-weight: 800;
  color: ${theme.colors.textTheme.primary};
  margin-bottom: 24px;
`;

export const BottomLinkContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
`;

export const BottomText = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.textTheme.secondary}
`;

export const BottomLink = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.blueTheme.primary};
  font-weight: bold;
  margin-left: 5px;
  text-decoration: underline;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 16px;
`;