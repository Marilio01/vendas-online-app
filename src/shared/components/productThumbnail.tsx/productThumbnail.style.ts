import styled from 'styled-components/native';

import { theme } from '../../themes/theme';

interface ContainerProps {
    margin?: string;
}

export const ProductThumbnailContainer = styled.TouchableOpacity<ContainerProps>`
  height: 200px;
  border-radius: 4px;
  width: 135px;
  border: 1px solid ${theme.colors.grayTheme.gray80};
  padding: 8px;

  margin: ${(props:ContainerProps) => props.margin || '0px'};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 75px;
  margin-bottom: 8px;

  border-radius: 4px;
`;