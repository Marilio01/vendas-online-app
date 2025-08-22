import styled from 'styled-components/native';

import { theme } from '../../themes/theme';

interface ContainerProps {
  margin?: string;
}

export const ProductThumbnailContainer = styled.TouchableOpacity<ContainerProps>`
  height: 200px;
  border-radius: 4px;
  width: 144px;
  border: 1px solid ${theme.colors.grayTheme.gray80};
  padding: 8px;

  margin: ${(props: ContainerProps) => props.margin || '0px'};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 75px;
  margin-bottom: 8px;

  border-radius: 4px;
`;

export const ProductInsertCart = styled.TouchableOpacity`
  width: 142px;
  height: 35px;
  background-color: ${theme.colors.mainTheme.primary};
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0px;
  left: 0px;

  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;


export const QuantityManagerContainer = styled.View`
  width: 142px;
  height: 35px;
  background-color: ${theme.colors.mainTheme.primary};

  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 

  position: absolute;
  bottom: 0px;
  left: 0px;

  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;