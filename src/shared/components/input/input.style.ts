import styled from 'styled-components/native';
import { theme } from '../../themes/theme';
import { Icon } from '../icon/Icon';
import { ActivityIndicator } from 'react-native';

interface ContainerInputProps {
  isError?: boolean;
  hasSecureTextEntry?: boolean;
}

export const ContainerInput = styled.TextInput<ContainerInputProps>`

  width: 100%;
  height: 42px;
  padding: 8px 16px;
  background-color: ${theme.colors.neutralTheme.white};
  color: ${theme.colors.neutralTheme.black};
  border-radius: 4px;

  padding-right: ${(props: ContainerInputProps) => (props.hasSecureTextEntry ? '52px' : '16px')};


  border-width: 1px;
  border-color: ${(props: ContainerInputProps) =>
    props.isError ? theme.colors.orangeTheme.orange80 : theme.colors.grayTheme.gray80};
`;

export const IconEye = styled(Icon)`
position: absolute;
  right: 16px;
  top: 10px;
`;

export const IconSearch = styled(Icon)`
  position: absolute;
  right: 16px;
  top: 12px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
    position: absolute;
    right: 16px;
    top: 18px;
`;