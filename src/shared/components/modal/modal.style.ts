import styled from 'styled-components/native';

import { theme } from '../../themes/theme';
import { Icon } from '../icon/Icon';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ContainerModal = styled.View`
  width: 100%;
  bottom: 0;
  background-color: ${theme.colors.neutralTheme.white};
  height: 200px;
  align-items: center;

  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  padding: 16px;
  z-index: 9;

  shadow-color: ${theme.colors.neutralTheme.black};
  shadow-offset: {
    width: 0;
    height: 0;
  }
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 10;
`;

export const IconCloseModal = styled(Icon)`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 10;
`;