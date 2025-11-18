import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useMemo } from 'react';
import { ProductType } from '../../../shared/types/productType';
import * as S from '../styles/product.style';
import { useCart } from '../../cart/hooks/useCart';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import Icon from 'react-native-vector-icons/Feather';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ProductNavigationProp = NativeStackNavigationProp<Record<string, ProductParams>>;

export interface ProductParams {
  product: ProductType;
  rating: string;
  reviewCount: number;
  oldPrice: string;
  hasDiscount: boolean;
  discountPercentage: number;
}

const Product = () => {
  const { params } = useRoute<RouteProp<Record<string, ProductParams>>>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { product, rating, reviewCount, oldPrice, hasDiscount, discountPercentage } = params;

  const { insertProductInCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const FOOTER_CLEARANCE = 80;

  const handleAddToCart = () => {
    insertProductInCart(product.id, quantity);
  };

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  return (
    <S.Container>
      <S.ScrollViewContainer
        contentContainerStyle={{ paddingBottom: FOOTER_CLEARANCE + insets.bottom }}
        scrollIndicatorInsets={{ top: headerHeight }}
      >
        <S.ImageWrapper>
          <S.ProductImage source={{ uri: product.image }} resizeMode="contain" />
        </S.ImageWrapper>

        <S.InfoContainer>
          <S.ProductName>{product.name}</S.ProductName>

          <S.ReviewWrapper>
            <Icon name="star" size={16} color="#FFC107" />
            <S.ReviewText>
              {rating} ({reviewCount} Reviews)
            </S.ReviewText>
          </S.ReviewWrapper>

          <S.PriceRow>
            <S.PriceContainer>
              <S.ProductPrice>{convertNumberToMoney(product.price)}</S.ProductPrice>
              {hasDiscount && <S.OldPrice>{oldPrice}</S.OldPrice>}
              {hasDiscount && (
                <S.DiscountBadge>
                  <S.DiscountText>-{discountPercentage}%</S.DiscountText>
                </S.DiscountBadge>
              )}
            </S.PriceContainer>

            <S.QuantityWrapper>
              <S.QuantityButton onPress={handleDecrease} disabled={quantity === 1}>
                <Icon
                  name="minus"
                  size={16}
                  color={quantity === 1 ? theme.colors.neutral.disabled : theme.colors.primary.main}
                />
              </S.QuantityButton>
              <S.QuantityAmount>{quantity}</S.QuantityAmount>
              <S.QuantityButton onPress={handleIncrease}>
                <Icon name="plus" size={16} color={theme.colors.primary.main} />
              </S.QuantityButton>
            </S.QuantityWrapper>
          </S.PriceRow>

          <S.ProductDescription>
            {product.description || 'Este produto ainda não possui uma descrição.'}
          </S.ProductDescription>
        </S.InfoContainer>
      </S.ScrollViewContainer>

      <S.Footer>
        <Button
          title="Adicionar"
          variant="primary"
          onPress={handleAddToCart}
          loading={loading}
          disabled={loading}
          style={{ flex: 1 }}
        />
      </S.Footer>
    </S.Container>
  );
};

export default Product;
