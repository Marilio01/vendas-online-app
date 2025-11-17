import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../shared/themes/theme';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.neutral.background};
  padding: 16px;
`;

export const SearchInputWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 24px;
  height: 48px;
  padding: 0 8px 0 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
`;

export const SearchPlaceholder = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  margin-left: 12px;
`;

export const SearchIcon = styled(Icon).attrs({
  size: 22,
  color: theme.colors.text.secondary,
})``;

export const CategoryBlock = styled.View`
  margin-bottom: 24px;
`;

export const CategoryTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  padding-left: 16px;
  margin-bottom: 12px;
`;

export const ProductItemWrapper = styled.View`
  margin-horizontal: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
`;
