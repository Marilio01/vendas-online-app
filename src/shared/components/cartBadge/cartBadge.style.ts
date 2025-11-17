import styled from 'styled-components/native';
import { theme } from '../../themes/theme';

export const BadgeContainer = styled.View`
  position: absolute;
  right: -8px;
  top: 0px;

  background-color: #ff3b30;

  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  padding-horizontal: 4px;

  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const BadgeText = styled.Text`
  color: ${theme.colors.neutral.surface};
  font-size: 9px;
  font-weight: bold;
`;
