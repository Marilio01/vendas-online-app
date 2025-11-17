import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ProductNavigationProp } from '../../../modules/product/screens/Product';
import { MenuUrl } from '../../enums/MenuUrl.enum';
import { convertNumberToMoney } from '../../functions/money';
import { ProductType } from '../../types/productType';
import Icon from 'react-native-vector-icons/Feather';
import { productDecorations } from '../../decorators/productDecorations';

import {
  ProductImage,
  ProductThumbnailWrapper,
  ProductClickableArea,
  ProductInfoWrapper,
  ProductName,
  ProductPrice,
  ImageWrapper,
  PriceContainer,
  OldPrice,
  ReviewWrapper,
  ReviewText,
  DiscountBadge,
  DiscountText,
  FloatingDiscountBadge,
  FloatingDiscountText,
} from './productThumbnail.style';

interface ProductThumbnailProps {
  product: ProductType;
  margin?: string;
}

const ProductThumbnail = ({ product, margin }: ProductThumbnailProps) => {
  const { navigate } = useNavigation<ProductNavigationProp>();

  const deco = productDecorations[product.id] || {
    rating: '4.5',
    reviewCount: 100,
    discountPercentage: 0,
  };

  const finalDiscount = deco.discountPercentage ?? 0;
  const hasDiscount = finalDiscount > 0;

  const oldPrice = convertNumberToMoney(
    product.price / (1 - finalDiscount / 100)
  );

  const handleGoToProduct = () => {
    navigate(MenuUrl.PRODUCT, {
      product,
      rating: deco.rating,
      reviewCount: deco.reviewCount,
      oldPrice,
      hasDiscount: hasDiscount,
      discountPercentage: finalDiscount,
    });
  };

  return (
    <ProductThumbnailWrapper margin={margin}>
      <ProductClickableArea onPress={handleGoToProduct}>
        <ImageWrapper>
          <ProductImage source={{ uri: product.image }} />
          {hasDiscount && (
            <FloatingDiscountBadge>
              <FloatingDiscountText>-{finalDiscount}%</FloatingDiscountText>
            </FloatingDiscountBadge>
          )}
        </ImageWrapper>
        <ProductInfoWrapper>
          <ProductName>{product.name}</ProductName>
          <PriceContainer>
            <ProductPrice>{convertNumberToMoney(product.price)}</ProductPrice>
            
            {hasDiscount && <OldPrice>{oldPrice}</OldPrice>}
            
          </PriceContainer>
          <ReviewWrapper>
            <Icon name="star" size={12} color="#FFC107" />
            <ReviewText>
              {deco.rating} ({deco.reviewCount} Reviews)
            </ReviewText>
          </ReviewWrapper>
        </ProductInfoWrapper>
      </ProductClickableArea>
    </ProductThumbnailWrapper>
  );
};

export default ProductThumbnail;