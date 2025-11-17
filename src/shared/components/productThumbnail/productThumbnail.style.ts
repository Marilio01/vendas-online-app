import styled from 'styled-components/native';
import { theme } from '../../themes/theme';

interface ContainerProps {
  margin?: string;
}

export const ProductThumbnailWrapper = styled.View<ContainerProps>`
  width: 160px;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 12px;
  margin: ${(props: ContainerProps) => props.margin || '0px'};
  margin-bottom: 12px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  overflow: hidden;
`;

export const ProductClickableArea = styled.TouchableOpacity`
  width: 100%;
`;

export const ImageWrapper = styled.View`
  width: 100%;
  height: 120px;
  background-color: ${theme.colors.neutral.surface};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  
  position: relative; 
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
  background-color: ${theme.colors.neutral.surface};
`;

export const ProductInfoWrapper = styled.View`
  padding: 12px;
`;

export const ProductName = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const FloatingDiscountBadge = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${theme.colors.semantic.error};
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10;
`;

export const FloatingDiscountText = styled.Text`
  color: ${theme.colors.neutral.surface};
  font-size: 12px;
  font-weight: 700;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;
  flex-wrap: wrap; 
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  flex-shrink: 1;
`;

export const OldPrice = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

export const DiscountBadge = styled.View`
  background-color: ${theme.colors.semantic.error};
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  flex-shrink: 0; 
`;

export const DiscountText = styled.Text`
  color: ${theme.colors.neutral.surface};
  font-size: 11px;
  font-weight: 700;
`;

export const ReviewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ReviewText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  margin-left: 4px;
`;