import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../shared/themes/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.neutral.background};
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
  font-size: 27px;
  font-weight: 800;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: 12px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 35px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 12px;
`;
