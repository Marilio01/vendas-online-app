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
  color: ${theme.colors.neutralTheme.black};
  font-weight: bold;
  margin-left: 5px;
  text-decoration: underline;
`;

interface PrimaryButtonProps {
  disabled?: boolean;
  theme: DefaultTheme;
}

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const PrimaryButton = styled.TouchableOpacity<PrimaryButtonProps>`
  width: 100%;
  height: 46px;
  background-color: ${({ disabled, theme }: { disabled?: boolean; theme: any }) =>
    disabled ? theme.colors.grayTheme.gray100 : theme.colors.neutralTheme.black};
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  elevation: 5;
  shadow-color: ${theme.colors.neutralTheme.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.20;
  shadow-radius: 5px;
`;

export const ButtonTextPrimary = styled.Text`
  color: ${theme.colors.neutralTheme.white};
  font-size: 14px;
  font-weight: 500;
`;