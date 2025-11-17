import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import Icon from 'react-native-vector-icons/Feather';

export const SearchProductContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.neutral.background};
  padding: 16px;
`;

export const SearchInputWrapper = styled.View`
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

export const SearchTextInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.text.secondary,
})`
  flex: 1;
  font-size: 16px;
  color: ${theme.colors.text.primary};
  margin-left: 12px;
`;

export const SearchIcon = styled(Icon).attrs({
  size: 22,
  color: theme.colors.text.secondary,
})``;

export const SearchProductScrollView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 72px;
  padding-horizontal: 16px;
`;
