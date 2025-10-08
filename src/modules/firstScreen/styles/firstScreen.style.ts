import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../shared/themes/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.neutralTheme.white};
  padding: 0 20px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 202px;
  height: 143px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${theme.colors.textTheme.primary};
  text-align: center;
  margin-bottom: 12px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.textTheme.secondary};
  text-align: center;
  margin-bottom: 50px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  background-color: ${theme.colors.neutralTheme.black};
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-color: ${theme.colors.neutralTheme.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.20;
  shadow-radius: 5px;
`;

export const ButtonTextPrimary = styled.Text`
  color: ${theme.colors.neutralTheme.white};
  font-size: 15px;
  font-weight: 500;
`;

export const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  border: 1px solid ${theme.colors.neutralTheme.black};
  border-radius: 34px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTextSecondary = styled.Text`
  color: ${theme.colors.neutralTheme.black};
  font-size: 15px;
  font-weight: 500;
`;
