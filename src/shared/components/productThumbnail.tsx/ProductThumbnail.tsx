
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { ProductNavigationProp } from '../../../modules/product/screens/Product';
import { MenuUrl } from '../../enums/MenuUrl.enum';
import { convertNumberToMoney } from '../../functions/money';
import { theme } from '../../themes/theme';
import { ProductType } from '../../types/productType';
import { Icon } from '../icon/Icon';
import Text from '../text/Text';
import { textTypes } from '../text/textTypes';
import { useCart } from '../../../modules/cart/hooks/useCart'; // Importe o novo hook completo
import CartQuantityManager from '../../../modules/cart/screens/CartQuantityManager'; // Importe o novo componente
import {
    ProductImage,
    ProductInsertCart,
    ProductThumbnailContainer,
} from './productThumbnail.style';

interface ProductThumbnailProps {
    product: ProductType;
    margin?: string;
}

const ProductThumbnail = ({ product, margin }: ProductThumbnailProps) => {
    const { navigate } = useNavigation<ProductNavigationProp>();

    const { cart, insertProductInCart, updateProductAmount, loading } = useCart();


    const productInCart = cart?.cartProduct?.find((item) => item.product?.id === product.id);

    const handleGoToProduct = () => {
        navigate(MenuUrl.PRODUCT, {
            product,
        });
    };

    return (
        <ProductThumbnailContainer onPress={handleGoToProduct} margin={margin}>
            <ProductImage source={{ uri: product.image }} />
            <Text type={textTypes.PARAGRAPH_SMALL_REGULAR}>{product.name}</Text>
            <Text color={theme.colors.mainTheme.primary} type={textTypes.PARAGRAPH_SEMI_BOLD}>
                {convertNumberToMoney(product.price)}
            </Text>


            {productInCart ? (
                <CartQuantityManager
                    amount={productInCart.amount}
                    onIncrease={() => updateProductAmount(productInCart, productInCart.amount + 1)}
                    onDecrease={() => updateProductAmount(productInCart, productInCart.amount - 1)}
                />
            ) : (
                <ProductInsertCart onPress={() => insertProductInCart(product.id)}>
                    {loading ? (
                        <ActivityIndicator color={theme.colors.neutralTheme.white} />
                    ) : (
                        <Icon name="cart" color={theme.colors.neutralTheme.white} />
                    )}
                </ProductInsertCart>
            )}
        </ProductThumbnailContainer>
    );
};

export default ProductThumbnail;